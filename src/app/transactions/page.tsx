'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Transactions
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Add Button */}
            <div className="relative group/add">
              <motion.button
                whileTap={isAdmin ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (!isAdmin) return;
                  setEditTarget(null);
                  setIsModalOpen(true);
                }}
                disabled={!isAdmin}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isAdmin
                    ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40'
                    : 'text-gray-400 bg-white/5 border border-white/10 opacity-60 cursor-not-allowed'
                }`}
              >
                {isAdmin ? (
                  <Plus className="h-4 w-4" />
                ) : (
                  <Lock className="h-3.5 w-3.5" />
                )}
                Add Transaction
              </motion.button>

              {/* Viewer tooltip */}
              {!isAdmin && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover/add:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-10 backdrop-blur-sm">
                  Switch to Admin to modify transactions
                </div>
              )}
            </div>
          </motion.div>

          {/* Viewer banner */}
          <AnimatePresence>
            {!isAdmin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 glass-card">
                  <Lock className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <p className="text-sm text-amber-200">
                    You&apos;re in <span className="font-semibold text-amber-400">Viewer</span> mode. Switch to <span className="font-semibold text-amber-400">Admin</span> to add, edit, or delete transactions.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <TransactionFilters />

          {/* Table */}
          <TransactionTable transactions={filteredTransactions} onEdit={handleEdit} />
        </div>
      </AppShell>

      {/* Modal rendered completely outside the AppShell layout tree */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        editTransaction={editTarget}
      />
    </>
  );
}
