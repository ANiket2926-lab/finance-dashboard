'use client';

import { motion, Variants, useScroll, useTransform } from 'framer-motion';
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

  // Scroll-driven transforms
  const { scrollY } = useScroll();
  
  // Top layer fades out quickly
  const opacityTop = useTransform(scrollY, [0, 150], [1, 0]);
  const scaleTop = useTransform(scrollY, [0, 150], [1, 0.95]);
  const yTop = useTransform(scrollY, [0, 150], [0, -30]);

  // Middle layer fades out slower
  const opacityMid = useTransform(scrollY, [100, 400], [1, 0.2]);
  const scaleMid = useTransform(scrollY, [100, 400], [1, 0.95]);

  return (
    <AppShell>
      <div className="space-y-6 md:space-y-8 pb-12">
        {/* Page Header (Dissolves on scroll) */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ opacity: opacityTop, scale: scaleTop, y: yTop }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">
            Welcome back! Here&apos;s your financial overview.
          </p>
        </motion.div>

        {/* Summary Cards (Fades and shrinks upward) */}
        <motion.div 
          custom={1} variants={sectionVariants} initial="hidden" animate="visible"
          style={{ opacity: opacityTop, scale: scaleTop }}
        >
          <SummaryCards
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </motion.div>

        {/* Financial Orbit & Chart (Fades slower) */}
        <motion.div 
          custom={2} variants={sectionVariants} initial="hidden" animate="visible"
          style={{ opacity: opacityMid, scale: scaleMid }}
        >
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

        {/* Details Row (Expands into focus when scrolled to) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
            <div className="lg:col-span-3">
              <RecentTransactions transactions={recentTransactions} />
            </div>
            <div className="lg:col-span-2">
              <SpendingPieChart data={categorySpending} />
            </div>
          </div>
        </motion.div>

        {/* Narrative / Insights (Progressive reveal on scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pt-6"
        >
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6">
            Your Financial Narrative
          </h2>
          <InsightCards insights={insights} />
        </motion.div>
      </div>
    </AppShell>
  );
}
