'use client';

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
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          {hasFilters ? (
            <>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
                <PackageOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No results found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                Try adjusting your search or filter criteria to find what you&apos;re looking for.
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No transactions yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                {isAdmin
                  ? 'Add your first transaction to start tracking your finances.'
                  : 'Switch to Admin mode to add transactions.'}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Table ────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110',
                        t.type === 'income'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30'
                          : 'bg-rose-100 dark:bg-rose-900/30'
                      )}
                    >
                      {t.type === 'income' ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {t.description}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(t.date)}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {t.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold',
                      t.type === 'income'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                    )}
                  >
                    {t.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={cn(
                      'text-sm font-bold',
                      t.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    )}
                  >
                    {t.type === 'income' ? '+' : '-'}
                    {formatCurrency(t.amount)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {isAdmin ? (
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => onEdit?.(t)}
                        className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 active:scale-90"
                        title="Edit transaction"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-200 active:scale-90"
                        title="Delete transaction"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                        <Lock className="h-3 w-3" />
                        Read-only
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800/50">
        {transactions.map((t) => (
          <div key={t.id} className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors active:bg-gray-100 dark:active:bg-gray-800/40">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0',
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
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {t.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.category} · {formatDate(t.date)}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span
                  className={cn(
                    'text-sm font-bold',
                    t.type === 'income'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  )}
                >
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </span>
              </div>
            </div>
            {isAdmin ? (
              <div className="flex items-center justify-end gap-2 mt-3">
                <button
                  onClick={() => onEdit?.(t)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 transition-all active:scale-95"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition-all active:scale-95"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end mt-2">
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                  <Lock className="h-3 w-3" /> Read-only
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
