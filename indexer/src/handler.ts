import type { Ledger, IndexedTransaction } from "./types";

export interface TransactionHandler {
  name: string;
  onLedger?(ledger: Ledger): Promise<void>;
  onTransaction?(tx: IndexedTransaction): Promise<void>;
}

export type HandlerSetup = {
  use(handler: TransactionHandler): void;
  handlers: TransactionHandler[];
};
