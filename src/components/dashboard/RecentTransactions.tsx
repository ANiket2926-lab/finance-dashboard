'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '@/types';
import { formatCurrency, formatDate, cn } from '@/utils';
import Link from 'next/link';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Recent Transactions
        </h3>
        <div className="flex h-48 items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-lg mb-1">💰</p>
            <p>No transactions yet</p>
            <p className="text-sm mt-1">Add some to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Transactions
        </h3>
        <Link
          href="/transactions"
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-3">
        {transactions.map((t, index) => (
          <div
            key={t.id}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon */}
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                t.type === 'income'
                  ? 'bg-emerald-100 dark:bg-emerald-900/30'
                  : 'bg-rose-100 dark:bg-rose-900/30'
              )}
            >
              {t.type === 'income' ? (
                <ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {t.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.category} · {formatDate(t.date)}
              </p>
            </div>

            {/* Amount */}
            <span
              className={cn(
                'text-sm font-bold whitespace-nowrap',
                t.type === 'income'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              )}
            >
              {t.type === 'income' ? '+' : '-'}
              {formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
