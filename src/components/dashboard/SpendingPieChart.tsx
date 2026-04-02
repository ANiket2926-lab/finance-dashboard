'use client';

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
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 h-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Spending by Category
        </h3>
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 mb-3">
            <PieChartIcon className="h-7 w-7 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No expense data yet</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Expense categories will appear here.</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
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
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
                itemStyle={{ color: '#e5e7eb' }}
                formatter={(value) => [formatCurrency(Number(value)), '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-2 gap-2 w-full">
          {data.slice(0, 6).map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-default"
            >
              <div
                className="h-3 w-3 rounded-full flex-shrink-0 transition-transform hover:scale-125"
                style={{ backgroundColor: item.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {item.name}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {((item.value / total) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
