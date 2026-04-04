'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, Shield, Eye, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useFinanceData } from '@/hooks/useFinanceData';
import { cn } from '@/utils';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const { state, dispatch } = useApp();
  const { totalIncome, totalExpenses } = useFinanceData();
  const isAdmin = state.role === 'admin';
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleRole = () => {
    dispatch({ type: 'SET_ROLE', payload: isAdmin ? 'viewer' : 'admin' });
  };

  // Financial health score (0-100)
  const healthScore = useMemo(() => {
    if (totalIncome === 0) return 0;
    const savingsRate = (totalIncome - totalExpenses) / totalIncome;
    return Math.max(0, Math.min(100, Math.round(savingsRate * 100)));
  }, [totalIncome, totalExpenses]);

  return (
    <header className="sticky top-0 z-30 px-4 md:px-6 py-3">
      <motion.div
        className={cn(
          'flex items-center justify-between gap-4 px-4 md:px-6 py-2.5 rounded-2xl',
          state.darkMode
            ? 'glass-card'
            : 'glass-card-light'
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Left: Menu + Health Ring */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-5 w-5 text-gray-400" />
          </motion.button>

          {/* Financial Health Score Ring */}
          <div className="hidden sm:flex items-center gap-3">
            <HealthRing score={healthScore} />
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Health Score</p>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{healthScore}%</p>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className={cn(
          'hidden md:flex items-center flex-1 max-w-md mx-4 px-4 py-2 rounded-xl transition-all duration-300',
          searchFocused
            ? 'bg-white/10 ring-1 ring-indigo-500/40 shadow-lg shadow-indigo-500/5'
            : 'bg-white/5 hover:bg-white/8'
        )}>
          <Search className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search anything…"
            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-500 bg-white/5 border border-white/10">
            ⌘K
          </kbd>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Role Toggle */}
          <motion.button
            onClick={toggleRole}
            className={cn(
              'flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              isAdmin
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/15'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/15'
            )}
            whileTap={{ scale: 0.95 }}
          >
            {isAdmin ? (
              <Shield className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'Viewer'}</span>
          </motion.button>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="relative p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle dark mode"
            whileTap={{ scale: 0.9, rotate: 15 }}
          >
            <div className="relative h-5 w-5">
              <Sun
                className={`absolute inset-0 h-5 w-5 text-amber-400 transition-all duration-300 ${
                  state.darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
              />
              <Moon
                className={`absolute inset-0 h-5 w-5 text-indigo-400 transition-all duration-300 ${
                  state.darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`}
              />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </header>
  );
}

/* ─── Health Score Ring ─────────────────────────────────────────────── */

function HealthRing({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const size = 42;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = () => {
    if (score >= 60) return { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.3)' };
    if (score >= 30) return { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)' };
    return { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)' };
  };

  const color = getColor();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            filter: `drop-shadow(0 0 6px ${color.glow})`,
          }}
        />
      </svg>
    </div>
  );
}
