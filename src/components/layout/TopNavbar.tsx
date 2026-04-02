'use client';

import { Menu, Moon, Sun, Shield, Eye } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/utils';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === 'admin';

  const toggleRole = () => {
    dispatch({ type: 'SET_ROLE', payload: isAdmin ? 'viewer' : 'admin' });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Role Toggle Button */}
        <button
          onClick={toggleRole}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 active:scale-[0.97]',
            isAdmin
              ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
              : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50'
          )}
        >
          {isAdmin ? (
            <Shield className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          {isAdmin ? 'Admin' : 'Viewer'}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 active:scale-95"
          aria-label="Toggle dark mode"
        >
          <div className="relative h-5 w-5">
            <Sun
              className={`absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-300 ${
                state.darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <Moon
              className={`absolute inset-0 h-5 w-5 text-indigo-400 transition-all duration-300 ${
                state.darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </div>
        </button>
      </div>
    </header>
  );
}
