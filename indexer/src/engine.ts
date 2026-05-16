import { StellarClient, Networks } from "@stellar-indexer/services";
import { Pipeline } from "./pipeline";
import { Storage, InMemoryStorage } from "./storage";
import type { IndexerOptions, IndexerStatus } from "./types";
import type { Ledger, IndexedTransaction } from "./types";

export class IndexerEngine {
  private client: StellarClient;
  private pipeline: Pipeline;
  private storage: Storage;
  private options: Required<IndexerOptions>;
  private running = false;
  private pollTimer: ReturnType<typeof setTimeout> | null = null;
  private currentCursor = "";

  constructor(options: IndexerOptions, storage?: Storage) {
    this.options = {
      network: options.network,
      startLedger: options.startLedger ?? 0,
      pollIntervalMs: options.pollIntervalMs ?? 5000,
      concurrency: options.concurrency ?? 1,
    };
    this.client = new StellarClient(this.options.network);
    this.pipeline = new Pipeline();
    this.storage = storage ?? new InMemoryStorage();
  }

  get pipelineRef(): Pipeline {
    return this.pipeline;
  }

  async start(): Promise<void> {
    this.running = true;
    await this.storage.connect();
    await this.resumeCursor();
    this.schedulePoll();
  }

  async stop(): Promise<void> {
    this.running = false;
    if (this.pollTimer) clearTimeout(this.pollTimer);
    await this.storage.disconnect();
  }

  async status(): Promise<IndexerStatus> {
    const latestNetwork = await this.client.getLatestLedger();
    const stored = await this.storage.getLatestLedger();
    return {
      latestIndexedLedger: stored?.sequence ?? 0,
      latestNetworkLedger: latestNetwork,
      chainHead: (stored?.sequence ?? 0) >= latestNetwork,
    };
  }

  private schedulePoll(): void {
    if (!this.running) return;
    this.pollTimer = setTimeout(() => this.poll(), this.options.pollIntervalMs);
  }

  private async resumeCursor(): Promise<void> {
    const latest = await this.storage.getLatestLedger();
    if (latest) {
      this.currentCursor = latest.sequence.toString();
    }
  }

  private async poll(): Promise<void> {
    if (!this.running) return;
    try {
      const latestNetwork = await this.client.getLatestLedger();
      const stored = await this.storage.getLatestLedger();
      const from = Math.max(
        this.options.startLedger,
        (stored?.sequence ?? 0) + 1,
      );

      if (from <= latestNetwork) {
        await this.syncLedgers(from, latestNetwork);
      }
    } catch (err) {
      console.error("[engine] poll failed:", err);
    } finally {
      this.schedulePoll();
    }
  }

  private async syncLedgers(from: number, to: number): Promise<void> {
    for (let seq = from; seq <= to; seq++) {
      const ledger: Ledger = {
        sequence: seq,
        hash: "",
        closedAt: new Date().toISOString(),
        transactionCount: 0,
      };
      await this.storage.saveLedger(ledger);
      await this.pipeline.process({ type: "ledger", data: ledger });
    }
  }
}
