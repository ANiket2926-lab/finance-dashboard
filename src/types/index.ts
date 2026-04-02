export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Food & Dining'
  | 'Shopping'
  | 'Transportation'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Healthcare'
  | 'Education'
  | 'Travel'
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export type Role = 'viewer' | 'admin';

export type SortField = 'date' | 'amount';
export type SortDirection = 'asc' | 'desc';

export interface Filters {
  search: string;
  type: TransactionType | 'all';
  sortField: SortField;
  sortDirection: SortDirection;
}

export interface Insight {
  title: string;
  value: string;
  description: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategorySpending {
  name: string;
  value: number;
  color: string;
}
