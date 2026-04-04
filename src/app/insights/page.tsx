'use client';

import { motion, Variants } from 'framer-motion';
import AppShell from '@/components/layout/AppShell';
import InsightCards from '@/components/insights/InsightCards';
import { useFinanceData } from '@/hooks/useFinanceData';
import { formatCurrency } from '@/utils';
import { BarChart3, TrendingDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function InsightsPage() {
  const { insights, monthlyData, categorySpending, totalIncome, totalExpenses, totalBalance } =
    useFinanceData();

  return (
    <AppShell>
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Insights
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Financial analytics and smart insights.
          </p>
        </motion.div>

        {/* Insight Cards */}
        <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
          <InsightCards insights={insights} />
        </motion.div>

        {/* Income vs Expenses Chart */}
        <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="rounded-2xl glass-card p-6 gradient-border hover-glow transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-6">
              Income vs Expenses
            </h3>
            {monthlyData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="barIncomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="barExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                      tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        padding: '12px 16px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                      }}
                      itemStyle={{ color: '#e5e7eb' }}
                      labelStyle={{ color: '#9ca3af', marginBottom: '8px', fontWeight: 600 }}
                      formatter={(value) => [formatCurrency(Number(value)), '']}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Bar
                      dataKey="income"
                      name="Income"
                      fill="url(#barIncomeGrad)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                      animationDuration={1200}
                    />
                    <Bar
                      dataKey="expenses"
                      name="Expenses"
                      fill="url(#barExpenseGrad)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                      animationDuration={1400}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mb-3">
                  <BarChart3 className="h-7 w-7 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-400">No data to compare</p>
                <p className="text-xs text-gray-500 mt-1">Add transactions to see income vs expenses.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="rounded-2xl glass-card p-6 gradient-border hover-glow transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-6">
              Spending Breakdown
            </h3>
            {categorySpending.length > 0 ? (
              <div className="space-y-4">
                {categorySpending.map((cat, index) => {
                  const percentage = totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0;
                  return (
                    <motion.div
                      key={cat.name}
                      className="group rounded-xl p-3 -mx-3 row-hover-glow transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-3 w-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-150"
                            style={{
                              backgroundColor: cat.color,
                              boxShadow: `0 0 8px ${cat.color}40`,
                            }}
                          />
                          <span className="text-sm font-medium text-gray-300">
                            {cat.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-200">
                            {formatCurrency(cat.value)}
                          </span>
                          <span className="text-xs text-gray-500 w-12 text-right font-medium">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-125"
                          style={{ backgroundColor: cat.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.5 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-48 flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mb-3">
                  <TrendingDown className="h-7 w-7 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-400">No expenses tracked</p>
                <p className="text-xs text-gray-500 mt-1">Spending categories will appear here.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Summary Footer */}
        <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Income', value: totalIncome, accentColor: 'rgba(16,185,129,0.15)', textColor: 'text-emerald-400', gradient: 'from-emerald-500 to-teal-600' },
              { label: 'Total Expenses', value: totalExpenses, accentColor: 'rgba(244,63,94,0.15)', textColor: 'text-rose-400', gradient: 'from-rose-500 to-pink-600' },
              { label: 'Net Balance', value: totalBalance, accentColor: 'rgba(99,102,241,0.15)', textColor: 'text-indigo-400', gradient: 'from-indigo-500 to-purple-600' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="relative overflow-hidden rounded-2xl glass-card p-5 text-center hover-lift gradient-border"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(ellipse at center, ${item.accentColor}, transparent 70%)`,
                  }}
                />
                <div className="relative">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className={`text-xl md:text-2xl font-bold ${item.textColor}`}>
                    {formatCurrency(item.value)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
