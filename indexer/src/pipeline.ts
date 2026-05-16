import type { TransactionHandler } from "./handler";
import type { Ledger, IndexedTransaction } from "./types";

export type PipelineEvent = {
  type: "ledger" | "transaction";
  data: Ledger | IndexedTransaction;
};

export class Pipeline {
  private handlers: TransactionHandler[] = [];

  constructor(handlers: TransactionHandler[] = []) {
    this.handlers = handlers;
  }

  use(handler: TransactionHandler): void {
    this.handlers.push(handler);
  }

  async process(event: PipelineEvent): Promise<void> {
    for (const handler of this.handlers) {
      try {
        if (event.type === "ledger" && handler.onLedger) {
          await handler.onLedger(event.data as Ledger);
        }
        if (event.type === "transaction" && handler.onTransaction) {
          await handler.onTransaction(event.data as IndexedTransaction);
        }
      } catch (err) {
        console.error(`[pipeline] handler "${handler.name}" failed:`, err);
      }
    }
  }
}
