'use client';

import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils';

interface FinancialOrbitProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

import MagneticCard from '@/components/ui/MagneticCard';

export default function FinancialOrbit({ totalBalance, totalIncome, totalExpenses }: FinancialOrbitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <MagneticCard className="glass-card rounded-2xl p-6 relative overflow-hidden gradient-border w-full h-full">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Financial Orbit</h3>

      <div className="flex items-center justify-center py-4">
        <div className="relative" style={{ width: 280, height: 280 }}>
          {/* Outer orbit path */}
          <svg className="absolute inset-0" width="280" height="280" viewBox="0 0 280 280">
            <circle cx="140" cy="140" r="120" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="140" cy="140" r="80" fill="none" stroke="rgba(139,92,246,0.06)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Central balance node */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-indigo-500/10 animate-pulse-glow" />
              <div className="relative flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/20 backdrop-blur-sm">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Balance</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">{formatCurrency(totalBalance)}</span>
              </div>
            </div>
          </motion.div>

          {/* Income orbiting node - clockwise */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10"
            style={{ marginLeft: -24, marginTop: -24 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          >
            <div style={{ transform: 'translateX(120px)' }}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
              >
                <div className="group relative">
                  <div className="absolute -inset-2 rounded-full bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm cursor-default">
                    <span className="text-[8px] font-medium text-emerald-400">IN</span>
                    <span className="text-[9px] font-bold text-emerald-300">{(totalIncome / 1000).toFixed(0)}k</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="px-2 py-1 rounded-lg bg-white/90 dark:bg-gray-900/90 text-[10px] text-gray-900 dark:text-white whitespace-nowrap border border-gray-200 dark:border-white/10 shadow-sm">
                      {formatCurrency(totalIncome)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Expense orbiting node - counter-clockwise */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10"
            style={{ marginLeft: -24, marginTop: -24 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
          >
            <div style={{ transform: 'translateX(80px)' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
              >
                <div className="group relative">
                  <div className="absolute -inset-2 rounded-full bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 backdrop-blur-sm cursor-default">
                    <span className="text-[8px] font-medium text-rose-400">OUT</span>
                    <span className="text-[9px] font-bold text-rose-300">{(totalExpenses / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="px-2 py-1 rounded-lg bg-white/90 dark:bg-gray-900/90 text-[10px] text-gray-900 dark:text-white whitespace-nowrap border border-gray-200 dark:border-white/10 shadow-sm">
                      {formatCurrency(totalExpenses)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Small decorative nodes on outer orbit */}
          {[0, 90, 180, 270].map((deg, i) => (
            <motion.div
              key={deg}
              className="absolute left-1/2 top-1/2"
              style={{ marginLeft: -3, marginTop: -3 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity, delay: i * 2.5 }}
            >
              <div style={{ transform: `rotate(${deg}deg) translateX(120px) rotate(-${deg}deg)` }}>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom labels */}
      <div className="flex items-center justify-center gap-8 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-gray-400">Income orbit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="text-xs text-gray-400">Expense orbit</span>
        </div>
      </div>
      </MagneticCard>
    </motion.div>
  );
}
