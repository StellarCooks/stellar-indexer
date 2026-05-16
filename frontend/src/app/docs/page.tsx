'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Book, Code, Boxes, Database, Play } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'getting-started', title: 'Getting Started', icon: Book },
  { id: 'services-api', title: 'Services API', icon: Code },
  { id: 'indexer-engine', title: 'Indexer Engine', icon: Boxes },
  { id: 'handlers', title: 'Handlers', icon: Code },
  { id: 'storage', title: 'Storage', icon: Database },
  { id: 'playground', title: 'Playground', icon: Play },
];

const installCode = `npm install @stellar-indexer/core @stellar-indexer/api

# or with pnpm
pnpm add @stellar-indexer/core @stellar-indexer/api`;

const quickStartCode = `import { IndexerEngine } from '@stellar-indexer/core';
import { PostgresStorage } from '@stellar-indexer/storage-postgres';

const engine = new IndexerEngine({
  network: 'mainnet',
  storage: new PostgresStorage({
    connectionString: process.env.DATABASE_URL,
  }),
});

await engine.start();
console.log('Indexer started successfully');`;

const apiCode = `import { createAPIServer } from '@stellar-indexer/api';

const server = createAPIServer({
  port: 3000,
  storage: postgresStorage,
});

server.listen(() => {
  console.log('API server running on port 3000');
});

// Query endpoints:
// GET /accounts/:accountId
// GET /transactions?ledger=12345
// GET /operations?account=GABC...`;

const handlerCode = `import { Handler } from '@stellar-indexer/core';

export const accountHandler: Handler = {
  name: 'accounts',

  async process(ledger) {
    for (const tx of ledger.transactions) {
      for (const op of tx.operations) {
        if (op.type === 'createAccount') {
          await this.storage.insertAccount({
            id: op.destination,
            balance: op.startingBalance,
            createdAt: ledger.closeTime,
          });
        }
      }
    }
  },
};`;

const storageCode = `// PostgreSQL Storage
import { PostgresStorage } from '@stellar-indexer/storage-postgres';

const pgStorage = new PostgresStorage({
  connectionString: process.env.DATABASE_URL,
  poolSize: 20,
});

// ClickHouse Storage (for analytics)
import { ClickHouseStorage } from '@stellar-indexer/storage-clickhouse';

const chStorage = new ClickHouseStorage({
  host: 'localhost',
  database: 'stellar',
});`;

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => document.getElementById(section.id));
      const current = sectionElements.find((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-1 rounded-xl border border-white/10 bg-card/30 p-4 backdrop-blur-sm">
              <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Documentation
              </div>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    activeSection === section.id
                      ? 'bg-primary/20 text-primary-light font-medium'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  )}
                >
                  <section.icon className="h-4 w-4" strokeWidth={2} />
                  {section.title}
                  {activeSection === section.id && (
                    <ChevronRight className="ml-auto h-3.5 w-3.5" strokeWidth={2.5} />
                  )}
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="mb-2 text-4xl font-bold">Documentation</h1>
              <p className="text-muted-foreground">Everything you need to build with Stellar Indexer</p>
            </motion.div>

            <div className="space-y-16">
              <section id="getting-started">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                  <Book className="h-6 w-6 text-primary-light" strokeWidth={2} /> Getting Started
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Install the Stellar Indexer packages and start indexing blockchain data in minutes.</p>
                  <h3 className="text-lg font-semibold">Installation</h3>
                  <CodeBlock code={installCode} language="bash" filename="terminal" />
                  <h3 className="text-lg font-semibold mt-6">Quick Start</h3>
                  <p className="text-muted-foreground">Set up a basic indexer that connects to Stellar and stores data in PostgreSQL.</p>
                  <CodeBlock code={quickStartCode} language="typescript" filename="index.ts" />
                </div>
              </section>

              <section id="services-api">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                  <Code className="h-6 w-6 text-primary-light" strokeWidth={2} /> Services API
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Create REST API endpoints to query your indexed Stellar data.</p>
                  <CodeBlock code={apiCode} language="typescript" filename="api.ts" />
                  <div className="rounded-xl border border-white/10 bg-card/30 p-6">
                    <h4 className="mb-3 font-semibold">Available Endpoints</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <code className="rounded bg-primary/20 px-2 py-1 font-mono text-xs text-primary-light">GET</code>
                        <code className="text-muted-foreground">/accounts/:accountId</code>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="rounded bg-primary/20 px-2 py-1 font-mono text-xs text-primary-light">GET</code>
                        <code className="text-muted-foreground">/transactions</code>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="rounded bg-primary/20 px-2 py-1 font-mono text-xs text-primary-light">GET</code>
                        <code className="text-muted-foreground">/operations</code>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="rounded bg-primary/20 px-2 py-1 font-mono text-xs text-primary-light">GET</code>
                        <code className="text-muted-foreground">/ledgers/:sequence</code>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="indexer-engine">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                  <Boxes className="h-6 w-6 text-primary-light" strokeWidth={2} /> Indexer Engine
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">The core indexing engine streams ledgers from Stellar and processes them through your handlers.</p>
                  <div className="rounded-xl border border-white/10 bg-card/30 p-6">
                    <h4 className="mb-3 font-semibold">Configuration Options</h4>
                    <div className="space-y-3 text-sm">
                      <div><code className="text-primary-light">network</code><span className="text-muted-foreground"> - Choose testnet, mainnet, or futurenet</span></div>
                      <div><code className="text-primary-light">storage</code><span className="text-muted-foreground"> - Storage backend instance</span></div>
                      <div><code className="text-primary-light">handlers</code><span className="text-muted-foreground"> - Array of data processing handlers</span></div>
                      <div><code className="text-primary-light">startLedger</code><span className="text-muted-foreground"> - Ledger sequence to start from</span></div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="handlers">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                  <Code className="h-6 w-6 text-primary-light" strokeWidth={2} /> Handlers
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Handlers process ledger data and transform it into your desired format.</p>
                  <CodeBlock code={handlerCode} language="typescript" filename="handlers/accounts.ts" />
                </div>
              </section>

              <section id="storage">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                  <Database className="h-6 w-6 text-primary-light" strokeWidth={2} /> Storage
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Multiple storage backends are available for different use cases.</p>
                  <CodeBlock code={storageCode} language="typescript" filename="storage.ts" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-card/30 p-6">
                      <h4 className="mb-2 font-semibold">PostgreSQL</h4>
                      <p className="text-sm text-muted-foreground">Best for transactional workloads and complex queries</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-card/30 p-6">
                      <h4 className="mb-2 font-semibold">ClickHouse</h4>
                      <p className="text-sm text-muted-foreground">Optimized for analytics and time-series data</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="playground">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                  <Play className="h-6 w-6 text-primary-light" strokeWidth={2} /> Playground
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Test queries and explore the API in our interactive playground.</p>
                  <a href="/playground" className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-light px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-primary/50">
                    Open Playground
                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
