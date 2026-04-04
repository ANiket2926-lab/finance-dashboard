'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Zap, PiggyBank, BarChart3 } from 'lucide-react';
import { Insight } from '@/types';
import { cn } from '@/utils';

interface InsightCardsProps {
  insights: Insight[];
}

const insightIcons = [BarChart3, Zap, PiggyBank];
const insightAccents = [
  { glow: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.15)', iconColor: 'text-violet-400', iconBg: 'bg-violet-500/10' },
  { glow: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.15)', iconColor: 'text-amber-400', iconBg: 'bg-amber-500/10' },
  { glow: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.15)', iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10' },
];

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');

  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function InsightCards({ insights }: InsightCardsProps) {
  if (insights.length === 0) {
    return (
      <div className="rounded-2xl glass-card p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No insights yet
          </h3>
          <p className="text-sm text-gray-400">
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
        const accent = insightAccents[index % insightAccents.length];
        const TrendIcon =
          insight.trend === 'up' ? TrendingUp : insight.trend === 'down' ? TrendingDown : Minus;

        return (
          <motion.div
            key={insight.title}
            className="relative rounded-2xl glass-card gradient-border overflow-hidden hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.4, ease: 'easeOut' }}
          >
            {/* Inner gradient glow */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(ellipse at 20% 20%, ${accent.glow}, transparent 70%)`,
              }}
            />

            {/* Decorative rings */}
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full border border-white/[0.03]" />
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full border border-white/[0.03]" />

            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  className={cn('p-2.5 rounded-xl', accent.iconBg)}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Icon className={cn('h-5 w-5', accent.iconColor)} />
                </motion.div>
                <div
                  className={cn(
                    'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium',
                    insight.trend === 'up'
                      ? 'bg-rose-500/10 text-rose-400'
                      : insight.trend === 'down'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-white/5 text-gray-400'
                  )}
                >
                  <TrendIcon className="h-3 w-3" />
                  {insight.value}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-white mb-1.5">
                {insight.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                <AnimatedText text={insight.description} delay={0.3 + index * 0.15} />
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
