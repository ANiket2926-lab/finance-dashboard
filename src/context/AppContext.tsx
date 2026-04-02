'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Transaction, Role, Filters, TransactionType, SortField, SortDirection } from '@/types';
import { mockTransactions } from '@/data/transactions';

// ─── State ───────────────────────────────────────────────────────────────────

interface AppState {
  transactions: Transaction[];
  role: Role;
  filters: Filters;
  darkMode: boolean;
  isLoading: boolean;
}

const initialFilters: Filters = {
  search: '',
  type: 'all',
  sortField: 'date',
  sortDirection: 'desc',
};

const initialState: AppState = {
  transactions: [],
  role: 'admin',
  filters: initialFilters,
  darkMode: false,
  isLoading: true,
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_TYPE_FILTER'; payload: TransactionType | 'all' }
  | { type: 'SET_SORT'; payload: { field: SortField; direction: SortDirection } }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_DARK_MODE'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_SEARCH':
      return { ...state, filters: { ...state.filters, search: action.payload } };
    case 'SET_TYPE_FILTER':
      return { ...state, filters: { ...state.filters, type: action.payload } };
    case 'SET_SORT':
      return {
        ...state,
        filters: {
          ...state.filters,
          sortField: action.payload.field,
          sortDirection: action.payload.direction,
        },
      };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  filteredTransactions: Transaction[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'finance-dashboard-transactions';
const DARK_MODE_KEY = 'finance-dashboard-dark-mode';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem(STORAGE_KEY);
      const storedDarkMode = localStorage.getItem(DARK_MODE_KEY);

      if (storedTransactions) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: JSON.parse(storedTransactions) });
      } else {
        dispatch({ type: 'SET_TRANSACTIONS', payload: mockTransactions });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTransactions));
      }

      if (storedDarkMode !== null) {
        dispatch({ type: 'SET_DARK_MODE', payload: JSON.parse(storedDarkMode) });
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        dispatch({ type: 'SET_DARK_MODE', payload: prefersDark });
      }
    } catch {
      dispatch({ type: 'SET_TRANSACTIONS', payload: mockTransactions });
    }

    // Simulate brief loading
    setTimeout(() => dispatch({ type: 'SET_LOADING', payload: false }), 600);
  }, []);

  // Persist transactions
  useEffect(() => {
    if (!state.isLoading && state.transactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    }
  }, [state.transactions, state.isLoading]);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(state.darkMode));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Compute filtered transactions
  const getFilteredTransactions = useCallback(() => {
    let filtered = [...state.transactions];
    const { search, type, sortField, sortDirection } = state.filters;

    // Search filter
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.amount.toString().includes(query)
      );
    }

    // Type filter
    if (type !== 'all') {
      filtered = filtered.filter((t) => t.type === type);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        comparison = a.amount - b.amount;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [state.transactions, state.filters]);

  const filteredTransactions = getFilteredTransactions();

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTransactions }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
