'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '@/utils';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export default function SummaryCards({
  totalBalance,
  totalIncome,
  totalExpenses,
}: SummaryCardsProps) {
  const cards = [
    {
      title: 'Current Balance',
      value: totalBalance,
      icon: Wallet,
      color: 'bg-apple-blue',
      trend: '+2.4%',
      isPositive: true,
      description: 'Total across all accounts'
    },
    {
      title: 'Monthly Income',
      value: totalIncome,
      icon: TrendingUp,
      color: 'bg-apple-green',
      trend: '+12.5%',
      isPositive: true,
      description: 'Total revenue this month'
    },
    {
      title: 'Monthly Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      color: 'bg-apple-purple',
      trend: '-4.8%',
      isPositive: false,
      description: 'Total spending this month'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card group overflow-hidden"
        >
          <div className="p-8 flex flex-col h-full relative">
            {/* Background Accent */}
            <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 ${card.color}`} />
            
            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 rounded-3xl ${card.color} text-white shadow-lg`}>
                <card.icon size={28} strokeWidth={2.5} />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                card.isPositive 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
              }`}>
                {card.trend}
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">{card.title}</p>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-1 tabular-nums tracking-tight">
                {formatCurrency(card.value)}
              </h3>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-4 leading-relaxed line-clamp-1">
                {card.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest cursor-pointer hover:underline">View details</span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
