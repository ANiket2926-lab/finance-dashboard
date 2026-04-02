'use client';

import { Menu, Moon, Sun, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Role } from '@/types';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const { state, dispatch } = useApp();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_ROLE', payload: e.target.value as Role });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Role Selector */}
        <div className="relative">
          <select
            value={state.role}
            onChange={handleRoleChange}
            className="appearance-none flex items-center gap-2 px-4 py-2 pr-9 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="admin">👑 Admin</option>
            <option value="viewer">👁️ Viewer</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
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
