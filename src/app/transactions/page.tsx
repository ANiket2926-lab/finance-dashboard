'use client';

import { useState } from 'react';
import { Plus, Lock } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import TransactionTable from '@/components/transactions/TransactionTable';
import TransactionFilters from '@/components/transactions/TransactionFilters';
import TransactionModal from '@/components/transactions/TransactionModal';
import { useApp } from '@/context/AppContext';
import { Transaction } from '@/types';

export default function TransactionsPage() {
  const { state, filteredTransactions } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Transaction | null>(null);
  const isAdmin = state.role === 'admin';

  const handleEdit = (transaction: Transaction) => {
    if (!isAdmin) return;
    setEditTarget(transaction);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditTarget(null);
  };

  return (
    <>
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                Transactions
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Add Button — always visible, disabled for Viewer */}
            <div className="relative group/add">
              <button
                onClick={() => {
                  if (!isAdmin) return;
                  setEditTarget(null);
                  setIsModalOpen(true);
                }}
                disabled={!isAdmin}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isAdmin
                    ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.97]'
                    : 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60'
                }`}
              >
                {isAdmin ? (
                  <Plus className="h-4 w-4" />
                ) : (
                  <Lock className="h-3.5 w-3.5" />
                )}
                Add Transaction
              </button>

              {/* Viewer tooltip */}
              {!isAdmin && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover/add:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-10">
                  Switch to Admin to modify transactions
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                </div>
              )}
            </div>
          </div>

          {/* Viewer banner */}
          {!isAdmin && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 animate-fade-in">
              <Lock className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-700 dark:text-amber-400">
                You&apos;re in <span className="font-semibold">Viewer</span> mode. Switch to <span className="font-semibold">Admin</span> to add, edit, or delete transactions.
              </p>
            </div>
          )}

          {/* Filters */}
          <TransactionFilters />

          {/* Table */}
          <TransactionTable transactions={filteredTransactions} onEdit={handleEdit} />
        </div>
      </AppShell>

      {/* Modal — rendered outside AppShell to escape CSS transform clamping */}
      {isAdmin && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={handleClose}
          editTransaction={editTarget}
        />
      )}
    </>
  );
}
