'use client';

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

export default function InsightsPage() {
  const { insights, monthlyData, categorySpending, totalIncome, totalExpenses, totalBalance } =
    useFinanceData();

  return (
    <AppShell>
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Insights
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Financial analytics and smart insights.
          </p>
        </div>

        {/* Insight Cards */}
        <InsightCards insights={insights} />

        {/* Income vs Expenses Chart */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Income vs Expenses
          </h3>
          {monthlyData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
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
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                  <Bar
                    dataKey="expenses"
                    name="Expenses"
                    fill="#f43f5e"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 mb-3">
                <BarChart3 className="h-7 w-7 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No data to compare</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add transactions to see income vs expenses.</p>
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Spending Breakdown
          </h3>
          {categorySpending.length > 0 ? (
            <div className="space-y-4">
              {categorySpending.map((cat) => {
                const percentage = totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0;
                return (
                  <div key={cat.name} className="group rounded-xl p-3 -mx-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {cat.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(cat.value)}
                        </span>
                        <span className="text-xs text-gray-400 w-12 text-right font-medium">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-48 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 mb-3">
                <TrendingDown className="h-7 w-7 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No expenses tracked</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Spending categories will appear here.</p>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Income', value: totalIncome, color: 'text-emerald-600 dark:text-emerald-400', accent: 'from-emerald-500 to-teal-600' },
            { label: 'Total Expenses', value: totalExpenses, color: 'text-rose-600 dark:text-rose-400', accent: 'from-rose-500 to-pink-600' },
            { label: 'Net Balance', value: totalBalance, color: 'text-indigo-600 dark:text-indigo-400', accent: 'from-indigo-500 to-purple-600' },
          ].map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accent}`} />
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className={`text-xl md:text-2xl font-bold ${item.color}`}>
                {formatCurrency(item.value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
