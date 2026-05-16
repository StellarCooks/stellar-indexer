'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Loader2 } from 'lucide-react';
import { Terminal } from '@/components/Terminal';
import { cn } from '@/lib/utils';

type Network = 'testnet' | 'mainnet' | 'futurenet';
type Action = 'getAccount' | 'getTransaction' | 'getOperations' | 'getLedger';

const mockResponses: Record<Action, string> = {
  getAccount: `{
  "id": "GABC1234567890DEFGHIJKLMNOPQRSTUVWXYZ",
  "account_id": "GABC1234567890DEFGHIJKLMNOPQRSTUVWXYZ",
  "sequence": "123456789012345",
  "balances": [
    { "balance": "10000.0000000", "asset_type": "native" },
    {
      "balance": "5000.0000000",
      "asset_code": "USDC",
      "asset_issuer": "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
    }
  ],
  "thresholds": { "low_threshold": 0, "med_threshold": 0, "high_threshold": 0 }
}`,
  getTransaction: `{
  "hash": "7f9a4e2c3d1b8f7a9c4e2a1d5b8f7c3e1e6a9d4b",
  "ledger": 2847392,
  "created_at": "2024-05-16T12:34:56Z",
  "source_account": "GABC1234567890DEFGHIJKLMNOPQRSTUVWXYZ",
  "fee_charged": "100",
  "operation_count": 3,
  "memo_type": "text",
  "memo": "Payment transaction"
}`,
  getOperations: `{
  "operations": [
    {
      "id": "123456789", "type": "payment",
      "from": "GABC1234567890DEFGHIJKLMNOPQRSTUVWXYZ",
      "to": "GDEF9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA",
      "amount": "100.0000000", "asset_type": "native"
    },
    {
      "id": "123456790", "type": "create_account",
      "funder": "GABC1234567890DEFGHIJKLMNOPQRSTUVWXYZ",
      "account": "GNEW1111111111NEWACCOUNTADDRESS",
      "starting_balance": "2.0000000"
    }
  ]
}`,
  getLedger: `{
  "sequence": 2847392,
  "hash": "7f9a4e2c3d1b8f7a9c4e2a1d5b8f7c3e1e6a9d4b",
  "prev_hash": "5b8f7c3e1e6a9d4b7f9a4e2c3d1b8f7a9c4e2a1d",
  "transaction_count": 247,
  "operation_count": 891,
  "closed_at": "2024-05-16T12:34:56Z",
  "total_coins": "105443902087.3472865",
  "fee_pool": "3190077.5490654"
}`,
};

export default function PlaygroundPage() {
  const [network, setNetwork] = useState<Network>('mainnet');
  const [action, setAction] = useState<Action>('getAccount');
  const [accountId, setAccountId] = useState('GABC1234567890DEFGHIJKLMNOPQRSTUVWXYZ');
  const [txHash, setTxHash] = useState('');
  const [ledgerSeq, setLedgerSeq] = useState('2847392');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setError(false);
    setOutput('');

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (action === 'getAccount' && !accountId) {
      setError(true);
      setOutput('Error: Account ID is required');
    } else if (action === 'getTransaction' && !txHash) {
      setError(true);
      setOutput('Error: Transaction hash is required');
    } else if (action === 'getLedger' && !ledgerSeq) {
      setError(true);
      setOutput('Error: Ledger sequence is required');
    } else {
      setOutput(mockResponses[action]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Playground</h1>
          <p className="text-muted-foreground">Test queries and explore the indexer API</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-3"
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
                    layoutId="playground-network-pill"
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
          className="grid gap-6 lg:grid-cols-2"
        >
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-card/30 p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-semibold">Query Builder</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Action</label>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value as Action)}
                    className="w-full rounded-lg border border-white/10 bg-input px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="getAccount">Get Account</option>
                    <option value="getTransaction">Get Transaction</option>
                    <option value="getOperations">Get Operations</option>
                    <option value="getLedger">Get Ledger</option>
                  </select>
                </div>

                {action === 'getAccount' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="mb-2 block text-sm font-medium">Account ID</label>
                    <input
                      type="text"
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                      placeholder="GABC..."
                      className="w-full rounded-lg border border-white/10 bg-input px-4 py-2.5 text-sm font-mono transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                )}

                {action === 'getTransaction' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="mb-2 block text-sm font-medium">Transaction Hash</label>
                    <input
                      type="text"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="0x7f9a..."
                      className="w-full rounded-lg border border-white/10 bg-input px-4 py-2.5 text-sm font-mono transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                )}

                {action === 'getLedger' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="mb-2 block text-sm font-medium">Ledger Sequence</label>
                    <input
                      type="text"
                      value={ledgerSeq}
                      onChange={(e) => setLedgerSeq(e.target.value)}
                      placeholder="2847392"
                      className="w-full rounded-lg border border-white/10 bg-input px-4 py-2.5 text-sm font-mono transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                )}

                {action === 'getOperations' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Account (optional)</label>
                      <input type="text" placeholder="GABC..." className="w-full rounded-lg border border-white/10 bg-input px-4 py-2.5 text-sm font-mono transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Limit</label>
                      <input type="number" defaultValue={10} className="w-full rounded-lg border border-white/10 bg-input px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={handleRun}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-light px-6 py-3 font-medium text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} /> Running...</>
                  ) : (
                    <><Play className="h-4 w-4" strokeWidth={2.5} /> Run Query</>
                  )}
                </button>
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-black/40 p-4">
                <div className="mb-2 text-xs font-medium text-muted-foreground">Generated Endpoint</div>
                <code className="text-xs text-primary-light">
                  {action === 'getAccount' && `GET /accounts/${accountId || ':accountId'}`}
                  {action === 'getTransaction' && `GET /transactions/${txHash || ':hash'}`}
                  {action === 'getOperations' && 'GET /operations?limit=10'}
                  {action === 'getLedger' && `GET /ledgers/${ledgerSeq || ':sequence'}`}
                </code>
              </div>
            </div>
          </div>

          <div>
            <Terminal output={output} loading={loading} error={error} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
