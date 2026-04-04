'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { CategorySpending } from '@/types';
import { formatCurrency } from '@/utils';

interface SpendingPieChartProps {
  data: CategorySpending[];
}

export default function SpendingPieChart({ data }: SpendingPieChartProps) {
  if (data.length === 0) {
    return (
      <motion.div
        className="rounded-2xl glass-card p-6 h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Spending by Category
        </h3>
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mb-3">
            <PieChartIcon className="h-7 w-7 text-gray-500" />
          </div>
          <p className="text-sm font-medium text-gray-400">No expense data yet</p>
          <p className="text-xs text-gray-500 mt-1">Expense categories will appear here.</p>
        </div>
      </motion.div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <motion.div
      className="rounded-2xl glass-card p-6 gradient-border hover-glow transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">
        Spending by Category
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Pie Chart */}
        <div className="h-56 w-56 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: `drop-shadow(0 0 6px ${entry.color}40)`,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
                itemStyle={{ color: '#e5e7eb' }}
                formatter={(value) => [formatCurrency(Number(value)), '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-2 gap-2 w-full">
          {data.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.name}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all cursor-default group"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <div
                className="h-3 w-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-150"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 8px ${item.color}40`,
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400 truncate">
                  {item.name}
                </p>
                <p className="text-sm font-semibold text-gray-200">
                  {((item.value / total) * 100).toFixed(0)}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
