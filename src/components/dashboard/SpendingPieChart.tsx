'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const APPLE_COLORS = [
  '#007AFF', // Blue
  '#30D158', // Green
  '#FF9F0A', // Orange
  '#BF5AF2', // Purple
  '#FF375F', // Pink
  '#64D2FF', // Sky
];

interface SpendingPieChartProps {
  data: { name: string; value: number }[];
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={12}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 14}
        outerRadius={outerRadius + 16}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={4}
      />
    </g>
  );
};

export default function SpendingPieChart({ data }: SpendingPieChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const activeData = data[activeIndex] || data[0] || { name: 'None', value: 0 };

  return (
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Spending</h3>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Allocation by Category</p>
        </div>
        <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
        </div>
      </div>

      <div className="relative flex-1 min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* @ts-ignore - Recharts 3.x type mismatch for activeIndex/activeShape */}
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={8}
              dataKey="value"
              onMouseEnter={onPieEnter}
              animationBegin={200}
              animationDuration={1200}
              stroke="none"
              cornerRadius={16}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={APPLE_COLORS[index % APPLE_COLORS.length]} 
                  style={{ filter: activeIndex === index ? 'drop-shadow(0 0 12px rgba(0,0,0,0.1))' : 'none' }}
                />
              ))}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-card px-4 py-3 border-white/20 shadow-2xl backdrop-blur-3xl">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-tight">Category</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{payload[0]?.name}</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-lg font-black text-blue-600 dark:text-blue-400">
                          ${payload[0]?.value?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{activeData.name}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                ${activeData.value.toLocaleString()}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        {data.slice(0, 4).map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: APPLE_COLORS[index % APPLE_COLORS.length] }} />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
