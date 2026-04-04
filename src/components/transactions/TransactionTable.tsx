'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Pencil, Trash2, Lock, PackageOpen } from 'lucide-react';
import { Transaction } from '@/types';
import { formatCurrency, formatDate, cn } from '@/utils';
import { useApp } from '@/context/AppContext';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
}

export default function TransactionTable({ transactions, onEdit }: TransactionTableProps) {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === 'admin';
  const hasFilters = state.filters.search || state.filters.type !== 'all';

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  // ── Empty state ──────────────────────────────────────────────────────────

  if (transactions.length === 0) {
    return (
      <motion.div
        className="rounded-2xl glass-card p-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          {hasFilters ? (
            <>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 mb-4">
                <PackageOpen className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No results found
              </h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Try adjusting your search or filter criteria to find what you&apos;re looking for.
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No transactions yet
              </h3>
              <p className="text-sm text-gray-400 max-w-sm">
                {isAdmin
                  ? 'Add your first transaction to start tracking your finances.'
                  : 'Switch to Admin mode to add transactions.'}
              </p>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  // ── Table ────────────────────────────────────────────────────────────────

  return (
    <motion.div
      className="rounded-2xl glass-card overflow-hidden gradient-border transition-all duration-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto relative z-10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider backdrop-blur-md">
                Transaction
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider backdrop-blur-md">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider backdrop-blur-md">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider backdrop-blur-md">
                Type
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider backdrop-blur-md">
                Amount
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider w-28 backdrop-blur-md">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence>
              {transactions.map((t, index) => (
                <motion.tr
                  layout
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.3 }}
                  className="row-hover-glow group transition-all"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-lg',
                          t.type === 'income'
                            ? 'bg-emerald-500/10 border border-emerald-500/20'
                            : 'bg-rose-500/10 border border-rose-500/20'
                        )}
                        whileHover={{ scale: 1.15, rotate: t.type === 'income' ? -10 : 10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        {t.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-rose-400" />
                        )}
                      </motion.div>
                      <span className="text-sm font-medium text-gray-200">
                        {t.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border',
                        t.type === 'income'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                      )}
                    >
                      {t.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={cn(
                        'text-sm font-bold',
                        t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                      )}
                    >
                      {t.type === 'income' ? '+' : '-'}
                      {formatCurrency(t.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {isAdmin ? (
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onEdit?.(t)}
                          className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-transparent hover:border-indigo-500/30 transition-all"
                          title="Edit transaction"
                        >
                          <Pencil className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(t.id)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-transparent hover:border-rose-500/30 transition-all"
                          title="Delete transaction"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Lock className="h-3 w-3" /> Read-only
                        </span>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-white/5 relative z-10">
        <AnimatePresence>
          {transactions.map((t, index) => (
            <motion.div
              layout
              key={t.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.3 }}
              className="p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0',
                      t.type === 'income'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                    )}
                  >
                    {t.type === 'income' ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">
                      {t.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {t.category} · {formatDate(t.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={cn(
                      'text-sm font-bold',
                      t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                    )}
                  >
                    {t.type === 'income' ? '+' : '-'}
                    {formatCurrency(t.amount)}
                  </span>
                </div>
              </div>
              {isAdmin && (
                <div className="flex items-center justify-end gap-2 mt-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit?.(t)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(t.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
