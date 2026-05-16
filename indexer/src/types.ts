import type { NetworkConfig } from "@stellar-indexer/services";

export type Ledger = {
  sequence: number;
  hash: string;
  closedAt: string;
  transactionCount: number;
};

export type IndexedTransaction = {
  hash: string;
  ledger: number;
  createdAt: string;
  source: string;
  fee: number;
  success: boolean;
  operationCount: number;
};

export type IndexerStatus = {
  latestIndexedLedger: number;
  latestNetworkLedger: number;
  chainHead: boolean;
};

export type IndexerOptions = {
  network: NetworkConfig;
  startLedger?: number;
  pollIntervalMs?: number;
  concurrency?: number;
};
