'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, cn } from '@/utils';
import { useApp } from '@/context/AppContext';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, increment * step);
      setDisplay(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{prefix}{formatCurrency(display)}</>;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 24;
  const padding = 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="opacity-60 group-hover:opacity-100 transition-opacity">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SummaryCards({ totalBalance, totalIncome, totalExpenses }: SummaryCardsProps) {
  const { state } = useApp();

  // Generate sparkline data from transactions
  const sparklineData = useMemo(() => {
    const transactions = state.transactions;
    const monthMap = new Map<string, { income: number; expenses: number; balance: number }>();

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const current = monthMap.get(key) || { income: 0, expenses: 0, balance: 0 };
      if (t.type === 'income') current.income += t.amount;
      else current.expenses += t.amount;
      monthMap.set(key, current);
    });

    const sorted = Array.from(monthMap.entries()).sort(([a], [b]) => a.localeCompare(b));
    let running = 0;
    const balances: number[] = [];
    const incomes: number[] = [];
    const expenses: number[] = [];

    sorted.forEach(([, data]) => {
      running += data.income - data.expenses;
      balances.push(running);
      incomes.push(data.income);
      expenses.push(data.expenses);
    });

    return { balances, incomes, expenses };
  }, [state.transactions]);

  const cards = [
    {
      id: 'total-balance',
      title: 'Total Balance',
      value: totalBalance,
      icon: DollarSign,
      gradientFrom: 'rgba(99, 102, 241, 0.15)',
      gradientTo: 'rgba(139, 92, 246, 0.05)',
      iconColor: 'text-indigo-400',
      iconGlow: 'shadow-indigo-500/20',
      accentColor: '#6366f1',
      sparkData: sparklineData.balances,
    },
    {
      id: 'total-income',
      title: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      gradientFrom: 'rgba(16, 185, 129, 0.15)',
      gradientTo: 'rgba(6, 182, 212, 0.05)',
      iconColor: 'text-emerald-400',
      iconGlow: 'shadow-emerald-500/20',
      accentColor: '#10b981',
      sparkData: sparklineData.incomes,
    },
    {
      id: 'total-expenses',
      title: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      gradientFrom: 'rgba(244, 63, 94, 0.15)',
      gradientTo: 'rgba(236, 72, 153, 0.05)',
      iconColor: 'text-rose-400',
      iconGlow: 'shadow-rose-500/20',
      accentColor: '#f43f5e',
      sparkData: sparklineData.expenses,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            className="group relative overflow-hidden rounded-2xl glass-card gradient-border hover-lift cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
          >
            {/* Inner gradient glow */}
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at 30% 50%, ${card.gradientFrom}, ${card.gradientTo})`,
              }}
            />

            <div className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    <AnimatedNumber value={card.value} />
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <motion.div
                    className={cn(
                      'p-3 rounded-xl bg-white/5 border border-white/5 shadow-lg',
                      card.iconGlow
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <Icon className={cn('h-5 w-5', card.iconColor)} />
                  </motion.div>
                  <MiniSparkline data={card.sparkData} color={card.accentColor} />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
