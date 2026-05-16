# Stellar Indexer

> High-performance, multi-tier blockchain indexer for Stellar — purpose-built for Soroban smart contract event indexing. Index contract events emitted by Stellar contracts via a global hosted indexer, your own self-hosted instance, or a paid priority-based indexer. Access everything from Rust, Python, TypeScript, and JavaScript through lightweight SDKs and API keys.

---

## The Problem

Stellar's Soroban smart contracts emit events during execution, but there's no built-in way to efficiently **query historical events**, **filter by contract ID or topic**, or **stream events in real-time** at scale. Teams building on Stellar either:

- Poll the Soroban RPC endpoint ledger-by-ledger (slow, expensive, misses data)
- Run full archival nodes and parse every ledger manually (complex ops, no standard tooling)
- Build one-off indexers per project (duplicated effort, no shared infrastructure)

**Stellar Indexer solves this** by providing a universal event-indexing layer that any Stellar contract can plug into in minutes.

---

## The Vision

A **unified indexing layer** for the Stellar ecosystem with three deployment tiers:

| Tier | Description | Use Case |
|------|-------------|----------|
| **🌐 Global Indexer** | Free hosted indexer — indexes every Soroban contract on Stellar. Query via public REST + GraphQL endpoints. Rate-limited but always available. | Prototyping, hackathons, light dApps, analytics dashboards |
| **🏠 Self-Hosted** | Open-source indexer you deploy yourself. Full control, no rate limits, private infrastructure. Runs on bare metal, Docker, or Kubernetes. | Production dApps, exchanges, high-throughput pipelines, compliance |
| **⚡ Priority Indexer** | Paid hosted tier — dedicated worker pools, guaranteed latency, priority queue, custom webhook delivery, SLA-backed. | Enterprise, high-frequency traders, institutional-grade infrastructure |

All three tiers are powered by the **same open-source core engine**, so you can start on the global tier and seamlessly migrate to self-hosted or priority as you scale.

---

## Architecture

```
                    ┌──────────────────────────────────────────┐
                    │            Stellar Network               │
                    │  (Soroban RPC + Horizon)                │
                    └──────────────┬───────────────────────────┘
                                   │
                    ┌──────────────▼───────────────────────────┐
                    │         Indexer Engine (core)           │
                    │  ┌─────────┐  ┌──────────┐  ┌────────┐ │
                    │  │ Pipeline │──►  Handler │──► Storage│ │
                    │  └─────────┘  └──────────┘  └────────┘ │
                    │  • Ledger streaming    • Pluggable      │
                    │  • Event filtering     • Backends       │
                    │  • Reconnection        • (Postgres,     │
                    │  • Cursor tracking       ClickHouse,    │
                    │                          S3, etc.)      │
                    └──────┬──────────────────────────────────┘
                           │
            ┌──────────────┼──────────────────┐
            ▼              ▼                   ▼
     ┌──────────┐  ┌──────────────┐  ┌────────────────┐
     │  Public  │  │  Self-Hosted │  │ Priority Queue │
     │ REST API │  │  REST API    │  │ + Webhooks     │
     │ (Global) │  │  (Your infra)│  │ (Paid)         │
     └────┬─────┘  └──────┬───────┘  └───────┬────────┘
          │               │                  │
          ▼               ▼                  ▼
    ┌─────────────────────────────────────────────┐
    │              SDK Layer                       │
    │  ┌──────┐  ┌────────┐  ┌──────────┐  ┌───┐ │
    │  │  TS  │  │ Python │  │   Rust   │  │ JS │ │
    │  └──────┘  └────────┘  └──────────┘  └───┘ │
    │         Authenticated via API Keys          │
    └─────────────────────────────────────────────┘
```

---

## Packages

| Package | Description |
|---------|-------------|
| `@stellar-indexer/services` | Network clients for Stellar (Horizon + Soroban RPC), network configs |
| `@stellar-indexer/indexer` | Core indexing engine — pipeline, handlers, storage interfaces |
| `@stellar-indexer/playground` | CLI tool + Express server for testing and exploration |
| `frontend` | Next.js dark-themed dashboard, docs, and interactive playground |

---

## Current Milestones

### 🟢 Phase 1 — Core Engine (In Progress)
- [x] Monorepo setup with npm workspaces
- [x] `@stellar-indexer/services` — `StellarClient`, `NetworkConfig`, `Networks`
- [x] `@stellar-indexer/indexer` — `IndexerEngine`, `Pipeline`, `TransactionHandler` interface, `Storage` interface, `InMemoryStorage`
- [x] `@stellar-indexer/playground` — CLI + Express web server for live network queries
- [x] Next.js frontend with dark-themed Home, Dashboard, Docs, and Playground pages
- [x] Published to GitHub under [StellarCooks/stellar-indexer](https://github.com/StellarCooks/stellar-indexer)
- [ ] **Contract event parsing** — decode Soroban contract events from ledger entries
- [ ] **Event filtering engine** — filter by contract ID, topic, or event type
- [ ] **Persistent storage adapters** — PostgreSQL, ClickHouse, Parquet/S3
- [ ] **Real ledger streaming** — connect to live Soroban RPC and stream in real-time

### 🟡 Phase 2 — Global Indexer & Public API
- [ ] Deploy global indexer instance (hosted on StellarCooks infra)
- [ ] Public REST API — `GET /events?contract=...&topic=...&from=...&to=...`
- [ ] GraphQL API — flexible queries, subscriptions for live event streams
- [ ] API key authentication tier (free rate-limited keys)
- [ ] Health endpoint, metrics, uptime monitoring
- [ ] Event replay — re-index events from any historical ledger

### 🟠 Phase 3 — SDKs & Multi-Language Support
- [ ] **TypeScript SDK** — `npm install @stellar-indexer/sdk`
- [ ] **Python SDK** — `pip install stellar-indexer`
- [ ] **Rust SDK** — `cargo add stellar-indexer`
- [ ] **JavaScript SDK** — (browser-compatible, no build step)
- [ ] Unified authentication — API key header on all SDKs, same interface
- [ ] SDK features: query events, subscribe to streams, manage webhooks

### 🔵 Phase 4 — Self-Hosted Indexer
- [ ] Docker images + `docker-compose.yml` for one-command deploy
- [ ] Helm chart for Kubernetes deployment
- [ ] Configuration via env vars + config file
- [ ] Admin dashboard (embedded in the frontend)
- [ ] Backup / restore, migration tooling
- [ ] Prometheus metrics + Grafana dashboards

### 🟣 Phase 5 — Priority Indexer (Paid Tier)
- [ ] Dedicated worker pool per customer
- [ ] Priority queue with guaranteed processing latency
- [ ] Custom webhook delivery (contract events → your endpoint, <100ms)
- [ ] SLA dashboard with real-time latency, throughput, error rates
- [ ] Usage-based billing (events indexed, webhook invocations)
- [ ] Multi-region deployment for geo-distributed access

### ⚪ Phase 6 — Ecosystem & Advanced Features
- [ ] Event schema registry — discover event formats from any Stellar contract
- [ ] Webhook retry with exponential backoff + dead-letter queue
- [ ] Indexer plugins — custom Python/TS handlers deployed as WASM plugins
- [ ] Historical backfill — index from genesis for any contract
- [ ] Cross-contract event correlation
- [ ] CLI tool (`npx stellar-indexer`) for managing indexers, viewing logs

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Build
```bash
git clone https://github.com/StellarCooks/stellar-indexer.git
cd stellar-indexer
npm install
npm run build
```

### Run the Playground
```bash
# CLI — query the latest ledger
npm run -w playground cli -- testnet

# Web server — interactive API explorer
npm run -w playground web
# -> http://localhost:4000
```

### Run the Frontend
```bash
npm run -w frontend dev
# -> http://localhost:3000
```

---

## Usage Examples

### TypeScript / JavaScript (via the engine directly)
```ts
import { IndexerEngine } from "@stellar-indexer/indexer";
import { Networks } from "@stellar-indexer/services";

const engine = new IndexerEngine({
  network: Networks.testnet,
  startLedger: 500000,
});

engine.pipelineRef.use({
  name: "event-logger",
  async onLedger(ledger) {
    console.log(`Ledger ${ledger.sequence} indexed`);
  },
});

await engine.start();
```

### Future SDK usage (Phase 3)
```ts
// TypeScript SDK
import { StellarIndexer } from "@stellar-indexer/sdk";

const client = new StellarIndexer({
  apiKey: "si_...",
  tier: "global", // "self-hosted" | "priority"
});

// Query events by contract
const events = await client.events({
  contractId: "CCW...",
  topic: "transfer",
  fromLedger: 1_000_000,
  limit: 100,
});

// Subscribe to live events
const sub = client.subscribe({
  contractId: "CCW...",
  onEvent: (event) => console.log("New event:", event),
});

// Register a webhook
await client.webhooks.create({
  url: "https://myapp.com/webhook/stellar",
  contracts: ["CCW..."],
  events: ["transfer", "swap"],
});
```

```python
# Python SDK
from stellar_indexer import StellarIndexer

client = StellarIndexer(api_key="si_...")

events = client.events(
    contract_id="CCW...",
    topic="transfer",
    from_ledger=1_000_000,
)
```

```rust
// Rust SDK
use stellar_indexer::{Client, EventQuery};

let client = Client::new("si_...");

let events = client
    .query(EventQuery::new("CCW...")
        .topic("transfer")
        .from_ledger(1_000_000))
    .await?;
```

---

## Contributing

We welcome contributions! Check out our [open issues](https://github.com/StellarCooks/stellar-indexer/issues) and feel free to open a PR.

---

## License

MIT
