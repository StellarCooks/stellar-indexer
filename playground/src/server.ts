import express from "express";
import { StellarClient, Networks } from "@stellar-indexer/services";

const app = express();
const PORT = process.env.PORT || 4000;

const client = new StellarClient(Networks.testnet);

app.get("/", (_req, res) => {
  res.json({
    service: "Stellar Indexer Playground",
    network: client.config.networkPassphrase,
  });
});

app.get("/ledger", async (_req, res) => {
  const ledger = await client.getLatestLedger();
  res.json({ latestLedger: ledger });
});

app.listen(PORT, () => {
  console.log(`Playground server running on http://localhost:${PORT}`);
});
