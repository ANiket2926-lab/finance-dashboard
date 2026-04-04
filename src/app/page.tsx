'use client';

import { motion, Variants } from 'framer-motion';
import AppShell from '@/components/layout/AppShell';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FinancialOrbit from '@/components/dashboard/FinancialOrbit';
import BalanceChart from '@/components/dashboard/BalanceChart';
import SpendingPieChart from '@/components/dashboard/SpendingPieChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import InsightCards from '@/components/insights/InsightCards';
import { useFinanceData } from '@/hooks/useFinanceData';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
  }),
};

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
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here&apos;s your financial overview.
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
          <SummaryCards
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </motion.div>

        {/* Financial Orbit */}
        <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-1">
              <FinancialOrbit
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
              />
            </div>
            <div className="lg:col-span-2">
              <BalanceChart data={monthlyData} />
            </div>
          </div>
        </motion.div>

        {/* Pie Chart Row */}
        <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
            <div className="lg:col-span-3">
              <RecentTransactions transactions={recentTransactions} />
            </div>
            <div className="lg:col-span-2">
              <SpendingPieChart data={categorySpending} />
            </div>
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible">
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Insights
          </h2>
          <InsightCards insights={insights} />
        </motion.div>
      </div>
    </AppShell>
  );
}
