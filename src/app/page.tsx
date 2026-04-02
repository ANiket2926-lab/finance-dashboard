'use client';

import AppShell from '@/components/layout/AppShell';
import SummaryCards from '@/components/dashboard/SummaryCards';
import BalanceChart from '@/components/dashboard/BalanceChart';
import SpendingPieChart from '@/components/dashboard/SpendingPieChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import InsightCards from '@/components/insights/InsightCards';
import { useFinanceData } from '@/hooks/useFinanceData';

export default function DashboardPage() {
  const {
    totalBalance,
    totalIncome,
    totalExpenses,
    monthlyData,
    categorySpending,
    recentTransactions,
    insights,
  } = useFinanceData();

  return (
    <AppShell>
      <div className="space-y-6 md:space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here&apos;s your financial overview.
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
          <div className="lg:col-span-3">
            <BalanceChart data={monthlyData} />
          </div>
          <div className="lg:col-span-2">
            <SpendingPieChart data={categorySpending} />
          </div>
        </div>

        {/* Insights */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Quick Insights
          </h2>
          <InsightCards insights={insights} />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </AppShell>
  );
}
