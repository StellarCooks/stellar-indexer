'use client';

import { motion } from 'motion/react';
import { ArrowRight, Zap, Shield, Database, GitBranch, Package, FileCode, Activity } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { StatCard } from '@/components/StatCard';

const features = [
  { icon: Zap, title: 'Real-time Indexing', description: 'Stream and index Stellar ledgers in real-time with sub-second latency' },
  { icon: Shield, title: 'In Development', description: 'Battle-tested infrastructure handling millions of transactions per day' },
  { icon: Database, title: 'Flexible Storage', description: 'Multiple storage backends including PostgreSQL, ClickHouse, and Parquet' },
  { icon: GitBranch, title: 'Monorepo Architecture', description: 'Clean separation between indexer engine, API services, and handlers' },
];

const packages = [
  { name: '@stellar-indexer/core', description: 'Core indexing engine with ledger streaming', icon: Package },
  { name: '@stellar-indexer/api', description: 'REST API service layer for querying indexed data', icon: FileCode },
  { name: '@stellar-indexer/handlers', description: 'Pre-built handlers for accounts, operations, and effects', icon: Activity },
];

export default function HomePage() {

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_65%)] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
          >
            <div className="h-2 w-2 rounded-full bg-secondary-light animate-pulse" />
            <span className="text-sm text-muted-foreground">In Development</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
          >
            Index Stellar in Real-Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 text-lg text-muted-foreground sm:text-xl"
          >
            High-performance blockchain indexer for Stellar. Stream ledgers, process operations,
            and query on-chain data with millisecond latency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button className="group flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 font-medium text-white shadow-lg shadow-primary/50 transition-all hover:shadow-xl hover:shadow-primary/60 hover:scale-105">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </button>
            <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-medium backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
              View Documentation
            </button>
          </motion.div>
        </div>
      </section>

      <SectionWrapper className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={Activity} label="Ledgers Indexed" value={2847392} animated />
          <StatCard icon={Database} label="Transactions/sec" value={1247} animated delay={0.1} />
          <StatCard icon={Zap} label="Avg Latency" value={127} suffix="ms" animated delay={0.2} />
          <StatCard icon={Shield} label="Uptime" value={99.9} suffix="%" animated delay={0.3} />
        </div>
      </SectionWrapper>

      <SectionWrapper className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Built for Scale</h2>
          <p className="text-lg text-muted-foreground">Everything you need to index and query Stellar blockchain data</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-card/80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary/20 to-primary-light/20 p-3">
                  <feature.icon className="h-5 w-5 text-primary-light" strokeWidth={2} />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Architecture</h2>
          <p className="text-lg text-muted-foreground">Modular monorepo design for maximum flexibility</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/30 p-8 backdrop-blur-sm">
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div whileHover={{ y: -4 }} className="rounded-xl border border-white/10 bg-gradient-to-br from-primary/10 to-primary/5 p-6">
              <div className="mb-3 inline-flex rounded-lg bg-primary/20 p-2">
                <Database className="h-5 w-5 text-primary-light" strokeWidth={2} />
              </div>
              <h3 className="mb-2 font-semibold">Indexer Engine</h3>
              <p className="text-sm text-muted-foreground">Core ledger streaming and data processing pipeline</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="rounded-xl border border-white/10 bg-gradient-to-br from-secondary/10 to-secondary/5 p-6">
              <div className="mb-3 inline-flex rounded-lg bg-secondary/20 p-2">
                <FileCode className="h-5 w-5 text-secondary-light" strokeWidth={2} />
              </div>
              <h3 className="mb-2 font-semibold">Services API</h3>
              <p className="text-sm text-muted-foreground">REST endpoints for querying indexed blockchain data</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="rounded-xl border border-white/10 bg-gradient-to-br from-primary-light/10 to-primary-light/5 p-6">
              <div className="mb-3 inline-flex rounded-lg bg-primary-light/20 p-2">
                <Activity className="h-5 w-5 text-primary-light" strokeWidth={2} />
              </div>
              <h3 className="mb-2 font-semibold">Storage Layer</h3>
              <p className="text-sm text-muted-foreground">Pluggable storage backends for different use cases</p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Packages</h2>
          <p className="text-lg text-muted-foreground">Modular packages for every part of your indexing pipeline</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-card/80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex items-start justify-between">
                  <div className="inline-flex rounded-lg bg-gradient-to-br from-primary/20 to-primary-light/20 p-3">
                    <pkg.icon className="h-5 w-5 text-primary-light" strokeWidth={2} />
                  </div>
                  <span className="rounded-full bg-secondary/20 px-2 py-1 text-xs text-secondary-light">npm</span>
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold text-primary-light">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="mx-auto max-w-7xl px-4 py-20">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 to-secondary/10 p-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-4xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-lg text-muted-foreground">Start indexing Stellar blockchain data in minutes</p>
          <button className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 font-medium text-white shadow-lg shadow-primary/50 transition-all hover:shadow-xl hover:shadow-primary/60 hover:scale-105">
            Get Started Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </button>
        </div>
      </SectionWrapper>
    </div>
  );
}
