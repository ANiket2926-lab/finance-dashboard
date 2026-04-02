'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
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
    setEditTarget(transaction);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditTarget(null);
  };

  return (
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
          {isAdmin && (
            <button
              onClick={() => {
                setEditTarget(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          )}
        </div>

        {/* Filters */}
        <TransactionFilters />

        {/* Table */}
        <TransactionTable transactions={filteredTransactions} onEdit={handleEdit} />
      </div>

      {/* Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        editTransaction={editTarget}
      />
    </AppShell>
  );
}
