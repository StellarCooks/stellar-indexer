'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  suffix?: string;
  delay?: number;
  animated?: boolean;
}

export function StatCard({ icon: Icon, label, value, suffix = '', delay = 0, animated = true }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const targetValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/,/g, ''), 10);

  useEffect(() => {
    if (!animated || !isInView || typeof value !== 'number') return;

    let start = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, targetValue, animated, value]);

  const formattedValue = animated && typeof value === 'number'
    ? displayValue.toLocaleString()
    : typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-card/80"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-start gap-4">
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary-light/20 p-3">
          <Icon className="h-5 w-5 text-primary-light" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-baseline gap-1">
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {formattedValue}
            </span>
            {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
          </div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
