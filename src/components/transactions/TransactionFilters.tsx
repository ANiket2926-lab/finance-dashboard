'use client';

import { motion } from 'framer-motion';
import { Search, ArrowUpDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TransactionType, SortField, SortDirection } from '@/types';
import { cn } from '@/utils';

export default function TransactionFilters() {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const handleTypeFilter = (type: TransactionType | 'all') => {
    dispatch({ type: 'SET_TYPE_FILTER', payload: type });
  };

  const handleSort = (field: SortField) => {
    const direction: SortDirection =
      filters.sortField === field && filters.sortDirection === 'desc' ? 'asc' : 'desc';
    dispatch({ type: 'SET_SORT', payload: { field, direction } });
  };

  const typeButtons: { label: string; value: TransactionType | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search */}
      <div className="relative flex-1 group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:bg-white/10 transition-all shadow-inner"
        />
      </div>

      {/* Type Filter */}
      <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
        {typeButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => handleTypeFilter(btn.value)}
            className={cn(
              'relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200',
              filters.type === btn.value
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            )}
          >
            {filters.type === btn.value && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Sort Buttons */}
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort('date')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
            filters.sortField === 'date'
              ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
              : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
          )}
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          Date
          {filters.sortField === 'date' && (
            <span className="text-xs">{filters.sortDirection === 'asc' ? '↑' : '↓'}</span>
          )}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort('amount')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
            filters.sortField === 'amount'
              ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
              : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
          )}
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          Amount
          {filters.sortField === 'amount' && (
            <span className="text-xs">{filters.sortDirection === 'asc' ? '↑' : '↓'}</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
