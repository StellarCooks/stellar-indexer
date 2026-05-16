'use client';

import { motion } from 'motion/react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  output: string;
  loading?: boolean;
  error?: boolean;
}

export function Terminal({ output, loading = false, error = false }: TerminalProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <TerminalIcon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
          <span className="text-xs text-muted-foreground">Output</span>
        </div>
      </div>
      <div className="relative min-h-[300px] max-h-[500px] overflow-auto p-4 font-mono text-sm">
        {loading ? (
          <div className="flex items-center gap-2 text-secondary-light">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Executing...
            </motion.div>
          </div>
        ) : output ? (
          <pre className={error ? 'text-destructive' : 'text-foreground'}>{output}</pre>
        ) : (
          <div className="text-muted-foreground">Run a query to see results</div>
        )}
      </div>
    </div>
  );
}
