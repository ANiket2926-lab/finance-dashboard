'use client';

import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Type Filter */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {typeButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => handleTypeFilter(btn.value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              filters.type === btn.value
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Sort Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleSort('date')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200',
            filters.sortField === 'date'
              ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          )}
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          Date
          {filters.sortField === 'date' && (
            <span className="text-xs">{filters.sortDirection === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
        <button
          onClick={() => handleSort('amount')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200',
            filters.sortField === 'amount'
              ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          )}
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          Amount
          {filters.sortField === 'amount' && (
            <span className="text-xs">{filters.sortDirection === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
      </div>
    </div>
  );
}
