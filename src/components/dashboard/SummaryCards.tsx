'use client';

import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, cn } from '@/utils';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export default function SummaryCards({ totalBalance, totalIncome, totalExpenses }: SummaryCardsProps) {
  const cards = [
    {
      id: 'total-balance',
      title: 'Total Balance',
      value: totalBalance,
      icon: DollarSign,
      gradient: 'from-indigo-500 to-purple-600',
      shadowColor: 'shadow-indigo-500/20',
      bgLight: 'bg-indigo-50',
      bgDark: 'dark:bg-indigo-950/30',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/50',
    },
    {
      id: 'total-income',
      title: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-600',
      shadowColor: 'shadow-emerald-500/20',
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-emerald-950/30',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    },
    {
      id: 'total-expenses',
      title: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      gradient: 'from-rose-500 to-pink-600',
      shadowColor: 'shadow-rose-500/20',
      bgLight: 'bg-rose-50',
      bgDark: 'dark:bg-rose-950/30',
      textColor: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-100 dark:bg-rose-900/50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={cn(
              'relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5',
              card.shadowColor
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient accent */}
            <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', card.gradient)} />

            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  {formatCurrency(card.value)}
                </p>
              </div>
              <div className={cn('p-3 rounded-xl', card.iconBg)}>
                <Icon className={cn('h-6 w-6', card.textColor)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
