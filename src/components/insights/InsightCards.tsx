'use client';

import { TrendingUp, TrendingDown, Minus, Zap, PiggyBank, BarChart3 } from 'lucide-react';
import { Insight } from '@/types';
import { cn } from '@/utils';

interface InsightCardsProps {
  insights: Insight[];
}

const insightIcons = [BarChart3, Zap, PiggyBank];
const insightGradients = [
  { bg: 'from-violet-500/10 to-purple-500/10 dark:from-violet-500/5 dark:to-purple-500/5', border: 'border-violet-200 dark:border-violet-800/50', iconBg: 'bg-violet-100 dark:bg-violet-900/40', iconColor: 'text-violet-600 dark:text-violet-400' },
  { bg: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5', border: 'border-amber-200 dark:border-amber-800/50', iconBg: 'bg-amber-100 dark:bg-amber-900/40', iconColor: 'text-amber-600 dark:text-amber-400' },
  { bg: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5', border: 'border-emerald-200 dark:border-emerald-800/50', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40', iconColor: 'text-emerald-600 dark:text-emerald-400' },
];

export default function InsightCards({ insights }: InsightCardsProps) {
  if (insights.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No insights yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add more transactions to see financial insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {insights.map((insight, index) => {
        const Icon = insightIcons[index % insightIcons.length];
        const style = insightGradients[index % insightGradients.length];
        const TrendIcon =
          insight.trend === 'up' ? TrendingUp : insight.trend === 'down' ? TrendingDown : Minus;

        return (
          <div
            key={insight.title}
            className={cn(
              'relative rounded-2xl border p-6 bg-gradient-to-br transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden',
              style.bg,
              style.border
            )}
          >
            {/* Decorative rings */}
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full border border-current opacity-5" />
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full border border-current opacity-5" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={cn('p-2.5 rounded-xl', style.iconBg)}>
                  <Icon className={cn('h-5 w-5', style.iconColor)} />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium',
                    insight.trend === 'up'
                      ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                      : insight.trend === 'down'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  )}
                >
                  <TrendIcon className="h-3 w-3" />
                  {insight.value}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
                {insight.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
