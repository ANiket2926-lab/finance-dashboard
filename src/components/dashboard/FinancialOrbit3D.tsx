'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { formatCurrency } from '@/utils';
import { MousePointer2, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface FinancialOrbit3DProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export default function FinancialOrbit3D({ totalBalance, totalIncome, totalExpenses }: FinancialOrbit3DProps) {
  // Magnetic hover effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto flex items-center justify-center p-8 md:p-20 perspective-deep overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] flex items-center justify-center"
      >
        {/* Core Balance Sphere */}
        <motion.div
          style={{ translateZ: 80 }}
          className="relative group z-50"
        >
          <div className="absolute -inset-10 bg-blue-500/10 blur-[60px] animate-pulse-subtle" />
          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full glass-card flex flex-col items-center justify-center border-white/20 dark:border-white/10 shadow-[0_0_80px_rgba(37,99,235,0.15)]">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border-dashed border-2 border-blue-500/20" 
            />
            <Wallet className="text-blue-500 mb-2 md:mb-4" size={32} />
            <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Total Liquidity</span>
            <span className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-1 tabular-nums">
              {formatCurrency(totalBalance)}
            </span>
          </div>
        </motion.div>

        {/* Orbit Systems */}
        <div className="absolute inset-0 flex items-center justify-center preserve-3d">
          
          {/* Income Orbit (Inner, Faster) */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[280px] h-[280px] md:w-[440px] md:h-[440px] preserve-3d"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d">
              <motion.div 
                style={{ translateZ: 50 }}
                className="group cursor-pointer"
              >
                <div className="absolute -inset-6 bg-emerald-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-apple-green flex flex-col items-center justify-center shadow-2xl border border-white/30 text-white group-hover:scale-110 transition-transform duration-500">
                  <TrendingUp size={28} strokeWidth={2.5} />
                  <span className="text-xs font-black uppercase mt-2">+{ (totalIncome/1000).toFixed(0) }k</span>
                </div>
                {/* Floating Tooltip */}
                <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 pointer-events-none">
                  <div className="glass-card px-5 py-3 whitespace-nowrap border-white/20 shadow-2xl">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Monthly Income</p>
                    <p className="text-lg font-black text-gray-900 dark:text-white mt-1">{formatCurrency(totalIncome)}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Expenses Orbit (Outer, Slower, Opposite) */}
          <motion.div
            animate={{ rotateZ: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[380px] h-[380px] md:w-[620px] md:h-[620px] preserve-3d"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 preserve-3d">
              <motion.div 
                style={{ translateZ: -80 }}
                className="group cursor-pointer"
              >
                <div className="absolute -inset-6 bg-rose-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-apple-purple flex flex-col items-center justify-center shadow-2xl border border-white/30 text-white group-hover:scale-110 transition-transform duration-500">
                  <TrendingDown size={28} strokeWidth={2.5} />
                  <span className="text-xs font-black uppercase mt-2">-{ (totalExpenses/1000).toFixed(0) }k</span>
                </div>
                {/* Floating Tooltip */}
                <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 pointer-events-none">
                  <div className="glass-card px-5 py-3 whitespace-nowrap border-white/20 shadow-2xl">
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Monthly Spending</p>
                    <p className="text-lg font-black text-gray-900 dark:text-white mt-1">{formatCurrency(totalExpenses)}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative Path Lines */}
          <div className="absolute w-[280px] h-[280px] md:w-[440px] md:h-[440px] rounded-full border border-gray-400/10 dark:border-white/10" />
          <div className="absolute w-[380px] h-[380px] md:w-[620px] md:h-[620px] rounded-full border border-gray-400/10 dark:border-white/10" />
          
          {/* Subtle Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.2, 0.8],
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                rotateZ: 360
              }}
              transition={{ 
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-2 h-2 rounded-full bg-blue-400/20 blur-[1px]"
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Action Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest opacity-40">
        <MousePointer2 size={12} />
        Interact with the ecosystem
      </div>
    </div>
  );
}
