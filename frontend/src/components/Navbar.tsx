'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Docs', path: '/docs' },
  { name: 'Playground', path: '/playground' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex cursor-pointer items-center gap-2 group">
            <div className="relative">
              <Box className="h-5 w-5 text-primary transition-transform group-hover:scale-110" strokeWidth={2.5} />
              <div className="absolute inset-0 bg-primary/20 blur-xl transition-opacity group-hover:opacity-100 opacity-0" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text font-semibold text-transparent">
              Stellar Indexer
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'relative px-4 py-2 text-sm transition-colors rounded-lg cursor-pointer',
                  pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all hover:border-white/20 hover:bg-white/10 cursor-pointer"
            >
              GitHub
            </a>
            <button className="rounded-lg bg-gradient-to-r from-primary to-primary-light px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-primary/50 cursor-pointer">
              Get Started
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block cursor-pointer rounded-lg px-4 py-2 text-sm transition-colors',
                    pathname === link.path
                      ? 'bg-white/10 text-foreground'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-center text-sm transition-all hover:border-white/20 hover:bg-white/10 cursor-pointer"
                >
                  GitHub
                </a>
                <button className="w-full rounded-lg bg-gradient-to-r from-primary to-primary-light px-4 py-2 text-sm font-medium text-white cursor-pointer">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
