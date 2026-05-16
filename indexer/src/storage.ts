import type { Ledger, IndexedTransaction } from "./types";

export interface Storage {
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  saveLedger(ledger: Ledger): Promise<void>;
  getLatestLedger(): Promise<Ledger | null>;

  saveTransaction(tx: IndexedTransaction): Promise<void>;
  getTransactions(ledger: number): Promise<IndexedTransaction[]>;
}

export class InMemoryStorage implements Storage {
  private ledgers: Map<number, Ledger> = new Map();
  private transactions: Map<number, IndexedTransaction[]> = new Map();

  async connect(): Promise<void> {}
  async disconnect(): Promise<void> {}

  async saveLedger(ledger: Ledger): Promise<void> {
    this.ledgers.set(ledger.sequence, ledger);
  }

  async getLatestLedger(): Promise<Ledger | null> {
    const maxSeq = Math.max(...this.ledgers.keys());
    if (!isFinite(maxSeq)) return null;
    return this.ledgers.get(maxSeq) ?? null;
  }

  async saveTransaction(tx: IndexedTransaction): Promise<void> {
    const existing = this.transactions.get(tx.ledger) ?? [];
    existing.push(tx);
    this.transactions.set(tx.ledger, existing);
  }

  async getTransactions(ledger: number): Promise<IndexedTransaction[]> {
    return this.transactions.get(ledger) ?? [];
  }
}
