'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, Maximize2 } from 'lucide-react';
import { formatCurrency } from '@/utils';

interface BalanceChartProps {
  data: { month: string; balance: number; income: number; expenses: number }[];
}

export default function BalanceChart({ data }: BalanceChartProps) {
  // Find highest point for reference
  const maxBalance = Math.max(...data.map(d => d.balance));
  
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col h-full group">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1 px-1">
            <Activity className="text-blue-500" size={16} />
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Portfolio Growth</h3>
          </div>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mt-1 ml-6">High-Fidelity Financial History</p>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-2 rounded-2xl border border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-2 px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-black text-gray-500 uppercase">Growth</span>
          </div>
          <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />
          <div className="flex items-center gap-2 px-3">
            <ArrowUpRight className="text-emerald-500" size={16} />
            <span className="text-xs font-bold text-emerald-500 tracking-tight">+14.2%</span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007AFF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007AFF" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#BF5AF2" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke="rgba(156, 163, 175, 0.08)" 
            />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              tickFormatter={(v) => `$${v/1000}k`}
            />
            <Tooltip 
              cursor={{ stroke: '#007AFF', strokeWidth: 2, strokeDasharray: '4 4' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-card px-5 py-4 border-white/20 shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-200">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-tight mb-1">{label}</p>
                      <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center justify-between gap-8">
                          <span className="text-xs font-bold text-gray-400">Total Equity</span>
                          <span className="text-lg font-black text-gray-900 dark:text-white">{formatCurrency(payload[0].value as number)}</span>
                        </div>
                        <div className="h-px w-full bg-gray-100 dark:bg-white/5" />
                        <div className="flex items-center justify-between gap-8 text-[11px] font-bold">
                          <div className="flex items-center gap-1.5 min-w-[70px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-gray-500">Inbound</span>
                          </div>
                          <span className="text-emerald-500">+{formatCurrency(payload[0].payload.income)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-8 text-[11px] font-bold">
                          <div className="flex items-center gap-1.5 min-w-[70px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="text-gray-500">Outbound</span>
                          </div>
                          <span className="text-rose-500">-{formatCurrency(payload[0].payload.expenses)}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Detailed Growth Path */}
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#007AFF"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorWave)"
              animationDuration={2500}
              dot={{ r: 0, fill: '#007AFF', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#007AFF' }}
            />
            <ReferenceLine 
              y={maxBalance} 
              stroke="#007AFF" 
              strokeDasharray="8 8" 
              strokeOpacity={0.15}
              label={{ position: 'right', value: 'High Value', fill: '#007AFF', fontSize: 10, fontWeight: 700, opacity: 0.5 }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-10 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
            <Activity size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Growth Trajectory</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Trend is positive</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/10 text-xs font-bold text-gray-600 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-white/10 hover:bg-gray-50 active:scale-95 transition-all">
          <Maximize2 size={14} />
          Full Report
        </button>
      </div>
    </div>
  );
}
