'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { useApp } from '@/context/AppContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state } = useApp();

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Animated gradient background */}
      <div className={`animated-bg ${!state.darkMode ? 'animated-bg-light' : ''}`} />

      {/* Content layer */}
      <div className="flex h-screen overflow-hidden w-full relative z-10">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                className="mx-auto max-w-7xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center relative">
      <div className="animated-bg" />
      <div className="flex flex-col items-center gap-6 relative z-10">
        {/* Orbital loading animation */}
        <div className="relative h-20 w-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
          {/* Spinning arc */}
          <svg className="absolute inset-0 h-20 w-20 animate-spin" style={{ animationDuration: '1.5s' }} viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="url(#loadGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 180"
            />
            <defs>
              <linearGradient id="loadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-gray-300 tracking-wide">Loading FinDash</p>
          <p className="text-xs text-gray-500">Preparing your dashboard…</p>
        </div>
      </div>
    </div>
  );
}
