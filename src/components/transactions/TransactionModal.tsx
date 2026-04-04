'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { Transaction, TransactionType, Category } from '@/types';
import { useApp } from '@/context/AppContext';
import { generateId, cn } from '@/utils';
import { CATEGORIES } from '@/data/transactions';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTransaction?: Transaction | null;
}

const defaultFormData = {
  description: '',
  amount: '',
  type: 'expense' as TransactionType,
  category: 'Food & Dining' as Category,
  date: new Date().toISOString().split('T')[0],
};

export default function TransactionModal({
  isOpen,
  onClose,
  editTransaction,
}: TransactionModalProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        description: editTransaction.description,
        amount: editTransaction.amount.toString(),
        type: editTransaction.type,
        category: editTransaction.category,
        date: editTransaction.date,
      });
    } else {
      setFormData(defaultFormData);
    }
    setErrors({});
  }, [editTransaction, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = 'Valid amount required';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const transaction: Transaction = {
      id: editTransaction?.id || generateId(),
      description: formData.description.trim(),
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
    };

    if (editTransaction) {
      dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg glass-card rounded-2xl border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">
                {editTransaction ? 'Edit Transaction' : 'New Transaction'}
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5 text-gray-400" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Grocery shopping"
                  className={cn(
                    'w-full px-4 py-2.5 rounded-xl border bg-white/5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 transition-all shadow-inner',
                    errors.description
                      ? 'border-rose-500/50 bg-rose-500/5 focus:ring-rose-500/50'
                      : 'border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white/10'
                  )}
                />
                {errors.description && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-xs text-rose-400 mt-2">
                    <AlertCircle className="h-3 w-3" /> {errors.description}
                  </motion.p>
                )}
              </div>

              {/* Amount & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className={cn(
                      'w-full px-4 py-2.5 rounded-xl border bg-white/5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 transition-all shadow-inner',
                      errors.amount
                        ? 'border-rose-500/50 bg-rose-500/5 focus:ring-rose-500/50'
                        : 'border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white/10'
                    )}
                  />
                  {errors.amount && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-xs text-rose-400 mt-2">
                      <AlertCircle className="h-3 w-3" /> {errors.amount}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={cn(
                      'w-full px-4 py-2.5 rounded-xl border bg-white/5 text-sm text-gray-200 focus:outline-none focus:ring-1 transition-all shadow-inner',
                      errors.date
                        ? 'border-rose-500/50 bg-rose-500/5 focus:ring-rose-500/50'
                        : 'border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white/10'
                    )}
                    style={{ colorScheme: 'dark' }}
                  />
                  {errors.date && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-xs text-rose-400 mt-2">
                      <AlertCircle className="h-3 w-3" /> {errors.date}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Type
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-white/5 border border-white/10">
                  {(['income', 'expense'] as TransactionType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={cn(
                        'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                        formData.type === type
                          ? type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                          : 'text-gray-400 hover:text-gray-200'
                      )}
                    >
                      {formData.type === type && (
                        <motion.div
                          layoutId="typeTabs"
                          className={cn(
                            'absolute inset-0 rounded-lg border shadow-sm',
                            type === 'income'
                              ? 'bg-emerald-500/10 border-emerald-500/20'
                              : 'bg-rose-500/10 border-rose-500/20'
                          )}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {type === 'income' ? '↑ Income' : '↓ Expense'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-gray-900 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
                >
                  {editTransaction ? 'Save Changes' : 'Add Transaction'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
