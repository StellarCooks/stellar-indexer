'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Database, Zap, Copy, Check, Circle } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { cn } from '@/lib/utils';

type Network = 'testnet' | 'mainnet' | 'futurenet';

interface Transaction {
  id: string;
  hash: string;
  ledger: number;
  timestamp: string;
  operations: number;
}

const mockTransactions: Transaction[] = [
  { id: '1', hash: '0x7f9a...4e2c', ledger: 2847392, timestamp: '2 sec ago', operations: 3 },
  { id: '2', hash: '0x3d1b...8f7a', ledger: 2847391, timestamp: '5 sec ago', operations: 1 },
  { id: '3', hash: '0x9c4e...2a1d', ledger: 2847390, timestamp: '8 sec ago', operations: 2 },
  { id: '4', hash: '0x5b8f...7c3e', ledger: 2847389, timestamp: '12 sec ago', operations: 4 },
  { id: '5', hash: '0x1e6a...9d4b', ledger: 2847388, timestamp: '15 sec ago', operations: 2 },
];

const connectionEndpoints = {
  testnet: 'https://horizon-testnet.stellar.org',
  mainnet: 'https://horizon.stellar.org',
  futurenet: 'https://horizon-futurenet.stellar.org',
};

function Skeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-white/10 bg-card/50 p-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-20 rounded bg-white/10" />
          <div className="h-4 w-32 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [network, setNetwork] = useState<Network>('mainnet');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [loading, setLoading] = useState(true);
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
        ledger: 2847392 + Math.floor(Math.random() * 100),
        timestamp: 'just now',
        operations: Math.floor(Math.random() * 5) + 1,
      };
      setTransactions((prev) => [newTransaction, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyEndpoint = async () => {
    await navigator.clipboard.writeText(connectionEndpoints[network]);
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Real-time indexer metrics and activity</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="text-sm text-muted-foreground">Network:</span>
          <div className="inline-flex rounded-lg border border-white/10 bg-card/50 p-1 backdrop-blur-sm">
            {(['testnet', 'mainnet', 'futurenet'] as Network[]).map((net) => (
              <button
                key={net}
                onClick={() => setNetwork(net)}
                className={cn(
                  'relative cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                  network === net ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {network === net && (
                  <motion.div
                    layoutId="network-pill"
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-md"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative capitalize">{net}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              <StatCard icon={Activity} label="Current Ledger" value={2847392} animated={false} />
              <StatCard icon={Database} label="Total Transactions" value={8472635} animated={false} />
              <StatCard icon={Zap} label="Processing Rate" value={1247} suffix="/s" animated={false} />
              <StatCard icon={Circle} label="Queue Depth" value={42} animated={false} />
            </>
          )}
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary-light animate-pulse" />
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-card/30 p-4 backdrop-blur-sm">
              <div className="grid grid-cols-12 gap-4 px-4 pb-2 text-xs font-medium text-muted-foreground">
                <div className="col-span-4">Hash</div>
                <div className="col-span-3">Ledger</div>
                <div className="col-span-3">Time</div>
                <div className="col-span-2">Ops</div>
              </div>
              <AnimatePresence mode="popLayout">
                {transactions.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-12 gap-4 rounded-lg border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/10"
                  >
                    <div className="col-span-4 font-mono text-sm text-primary-light">{tx.hash}</div>
                    <div className="col-span-3 text-sm text-foreground">{tx.ledger.toLocaleString()}</div>
                    <div className="col-span-3 text-sm text-muted-foreground">{tx.timestamp}</div>
                    <div className="col-span-2 text-sm text-foreground">{tx.operations}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-4 text-xl font-semibold">Connection Status</h2>
            <div className="space-y-4 rounded-xl border border-white/10 bg-card/30 p-6 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-secondary/20 p-2">
                  <Circle className="h-4 w-4 text-secondary-light fill-secondary-light" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-sm font-medium">Status</div>
                  <div className="text-sm text-secondary-light">Connected</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="mb-2 text-sm font-medium">Endpoint</div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-3">
                  <code className="flex-1 overflow-hidden text-ellipsis text-xs text-muted-foreground">
                    {connectionEndpoints[network]}
                  </code>
                  <button
                    onClick={handleCopyEndpoint}
                  className={cn(
                    'cursor-pointer rounded p-1.5 transition-colors',
                    copiedEndpoint
                      ? 'bg-secondary/20 text-secondary-light'
                      : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                  )}
                    aria-label="Copy endpoint"
                  >
                    {copiedEndpoint ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    ) : (
                      <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="mb-3 text-sm font-medium">Metrics</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Latency</span>
                    <span className="text-sm font-medium">127ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Sync</span>
                    <span className="text-sm font-medium">2s ago</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
