'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AppShell from '@/components/layout/AppShell';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FinancialOrbit from '@/components/dashboard/FinancialOrbit';
import FinancialOrbit3D from '@/components/dashboard/FinancialOrbit3D';
import BalanceChart from '@/components/dashboard/BalanceChart';
import SpendingPieChart from '@/components/dashboard/SpendingPieChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import InsightCards from '@/components/insights/InsightCards';
import { useFinanceData } from '@/hooks/useFinanceData';
import { LayoutGrid, Globe, Zap } from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orbit'>('overview');
  const {
    totalBalance,
    totalIncome,
    totalExpenses,
    monthlyData,
    categorySpending,
    recentTransactions,
    insights,
  } = useFinanceData();

  const { scrollY } = useScroll();
  const opacityTop = useTransform(scrollY, [0, 150], [1, 0]);
  const scaleTop = useTransform(scrollY, [0, 150], [1, 0.98]);

  return (
    <AppShell>
      <div className="space-y-6 md:space-y-10 pb-20">
        {/* Apple Style Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div style={{ opacity: opacityTop, scale: scaleTop }}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Your financial ecosystem, refined.
            </p>
          </div>

          {/* Premium Tab Toggle */}
          <div className="flex p-1.5 bg-gray-100 dark:bg-white/5 rounded-full w-fit backdrop-blur-xl border border-gray-200 dark:border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <LayoutGrid size={18} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orbit')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === 'orbit'
                  ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Globe size={18} />
              Live Orbit
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse ml-1" />
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 md:space-y-12"
            >
              {/* Summary Cards */}
              <SummaryCards
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
              />

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                  <BalanceChart data={monthlyData} />
                </div>
                <div className="lg:col-span-1">
                  <SpendingPieChart data={categorySpending} />
                </div>
              </div>

              {/* Transactions & Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
                <div className="lg:col-span-3">
                  <RecentTransactions transactions={recentTransactions} />
                </div>
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center gap-3 mb-2 px-1">
                    <Zap className="text-amber-500" size={20} />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Smart Insights</h2>
                  </div>
                  <InsightCards insights={insights} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="orbit"
              initial={{ opacity: 0, rotateX: -10, scale: 0.95 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: 10, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-[600px] flex items-center justify-center perspective-deep"
            >
              <FinancialOrbit3D 
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
