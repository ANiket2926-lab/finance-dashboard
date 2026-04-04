'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { CategorySpending } from '@/types';
import { formatCurrency } from '@/utils';

import MagneticCard from '@/components/ui/MagneticCard';

interface SpendingPieChartProps {
  data: CategorySpending[];
}

export default function SpendingPieChart({ data }: SpendingPieChartProps) {
  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="h-full"
      >
        <MagneticCard className="rounded-2xl glass-card p-6 h-full w-full">
          <h3 className="text-lg font-semibold text-white mb-4">
            Spending by Category
          </h3>
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mb-3">
              <PieChartIcon className="h-7 w-7 text-gray-500" />
            </div>
            <p className="text-sm font-medium text-gray-400">No expenses yet</p>
            <p className="text-xs text-gray-500 mt-1">Add expenses to see your breakdown.</p>
          </div>
        </MagneticCard>
      </motion.div>
    );
  }

  // Define premium jewel-tone colors for the pie
  const COLORS = ['#8b5cf6', '#10b981', '#f43f5e', '#0ea5e9', '#f59e0b', '#d946ef'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="h-full"
    >
      <MagneticCard className="rounded-2xl glass-card p-6 gradient-border hover-glow transition-all duration-300 w-full h-full">
        <h3 className="text-lg font-semibold text-white mb-6">
          Spending by Category
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-[220px] w-[220px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {/* Create a drop shadow filter for pie pieces */}
                  <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
                  </filter>
                </defs>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      style={{ filter: 'url(#pieShadow)', outline: 'none' }}
                      className="hover:opacity-80 transition-opacity duration-300"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(9, 9, 11, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                  itemStyle={{ color: '#e5e7eb' }}
                  formatter={(value) => formatCurrency(Number(value))}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full border border-white/5 shadow-inner" />
            </div>
          </div>
          
          <div className="flex-1 w-full mt-4 md:mt-0 px-2 lg:px-6">
            <ul className="space-y-4">
              <AnimatePresence>
                {data.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="flex justify-between items-center group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-150"
                        style={{ backgroundColor: COLORS[index % COLORS.length], boxShadow: `0 0 10px ${COLORS[index % COLORS.length]}80` }}
                      />
                      <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(item.value)}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </MagneticCard>
    </motion.div>
  );
}
