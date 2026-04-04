'use client';

import { motion } from 'framer-motion';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { MonthlyData } from '@/types';
import { formatCurrency } from '@/utils';

interface BalanceChartProps {
  data: MonthlyData[];
}

export default function BalanceChart({ data }: BalanceChartProps) {
  if (data.length === 0) {
    return (
      <motion.div
        className="rounded-2xl glass-card p-6 h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Balance Over Time
        </h3>
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mb-3">
            <TrendingUp className="h-7 w-7 text-gray-500" />
          </div>
          <p className="text-sm font-medium text-gray-400">No chart data yet</p>
          <p className="text-xs text-gray-500 mt-1">Add transactions to see your balance trend.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-2xl glass-card p-6 gradient-border hover-glow transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">
        Balance Over Time
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
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
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 20px rgba(99,102,241,0.1)',
              }}
              itemStyle={{ color: '#e5e7eb' }}
              labelStyle={{ color: '#9ca3af', marginBottom: '8px', fontWeight: 600 }}
              formatter={(value) => [formatCurrency(Number(value)), '']}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#balanceGradient)"
              name="Balance"
              dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: 'rgba(99,102,241,0.3)' }}
              activeDot={{
                r: 7,
                fill: '#6366f1',
                stroke: 'rgba(99,102,241,0.3)',
                strokeWidth: 4,
                filter: 'url(#glow)',
              }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Income"
              dot={false}
              animationDuration={1800}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#f43f5e"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Expenses"
              dot={false}
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
