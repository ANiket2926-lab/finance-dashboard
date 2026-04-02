'use client';

import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import {
  getTotalBalance,
  getTotalIncome,
  getTotalExpenses,
  getMonthlyData,
  getCategorySpending,
  getInsights,
} from '@/utils';

export function useFinanceData() {
  const { state } = useApp();
  const { transactions } = state;

  const totalBalance = useMemo(() => getTotalBalance(transactions), [transactions]);
  const totalIncome = useMemo(() => getTotalIncome(transactions), [transactions]);
  const totalExpenses = useMemo(() => getTotalExpenses(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categorySpending = useMemo(() => getCategorySpending(transactions), [transactions]);
  const insights = useMemo(() => getInsights(transactions), [transactions]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    monthlyData,
    categorySpending,
    insights,
    recentTransactions,
  };
}
