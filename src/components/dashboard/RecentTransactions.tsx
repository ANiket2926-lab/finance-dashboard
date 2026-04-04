'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '@/types';
import { formatCurrency, formatDate, cn } from '@/utils';
import Link from 'next/link';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

import MagneticCard from '@/components/ui/MagneticCard';

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <MagneticCard className="rounded-2xl glass-card p-6 h-full w-full">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Transactions
          </h3>
          <div className="flex h-48 items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-1">💰</p>
              <p>No transactions yet</p>
              <p className="text-sm mt-1">Add some to get started!</p>
            </div>
          </div>
        </MagneticCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <MagneticCard className="rounded-2xl glass-card p-6 gradient-border hover-glow transition-all duration-300 h-full w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Recent Transactions
          </h3>
          <Link
            href="/transactions"
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View all →
          </Link>
        </div>

      <div className="space-y-2">
        {transactions.map((t, index) => (
          <motion.div
            key={t.id}
            className="flex items-center gap-4 p-3 rounded-xl row-hover-glow transition-all duration-200 group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.06, duration: 0.3 }}
          >
            {/* Icon */}
            <motion.div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl',
                t.type === 'income'
                  ? 'bg-emerald-500/10 border border-emerald-500/10'
                  : 'bg-rose-500/10 border border-rose-500/10'
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {t.type === 'income' ? (
                <ArrowUpRight className="h-5 w-5 text-emerald-400" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-rose-400" />
              )}
            </motion.div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">
                {t.description}
              </p>
              <p className="text-xs text-gray-500">
                {t.category} · {formatDate(t.date)}
              </p>
            </div>

            {/* Amount */}
            <span
              className={cn(
                'text-sm font-bold whitespace-nowrap',
                t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
              )}
            >
              {t.type === 'income' ? '+' : '-'}
              {formatCurrency(t.amount)}
            </span>
          </motion.div>
        ))}
      </div>
      </MagneticCard>
    </motion.div>
  );
}
