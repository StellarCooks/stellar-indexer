'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
      {filename && (
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
          <span className="text-sm text-muted-foreground">{filename}</span>
          <span className="rounded bg-primary/20 px-2 py-0.5 text-xs text-primary-light">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className={cn(
            'absolute right-3 top-3 cursor-pointer rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-sm transition-all',
            'opacity-0 group-hover:opacity-100',
            copied ? 'text-secondary-light' : 'text-muted-foreground hover:text-foreground'
          )}
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
        <pre className="overflow-x-auto p-4">
          <code className="text-sm text-foreground">{code}</code>
        </pre>
      </div>
    </div>
  );
}
