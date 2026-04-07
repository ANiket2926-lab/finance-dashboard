'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, ShoppingBag, Coffee, Car, Home, Smartphone, Search, Filter, MoreVertical, CreditCard } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils';

const CATEGORY_ICONS: Record<string, any> = {
  'Shopping': ShoppingBag,
  'Food & Dining': Coffee,
  'Transportation': Car,
  'Housing': Home,
  'Entertainment': Smartphone,
  'Groceries': ShoppingCart,
  'Health': CreditCard,
  'Personal': Smartphone,
  'Salary': CreditCard,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Shopping': 'bg-apple-purple',
  'Food & Dining': 'bg-apple-orange',
  'Transportation': 'bg-apple-blue',
  'Housing': 'bg-gray-700',
  'Entertainment': 'bg-apple-pink',
  'Groceries': 'bg-apple-green',
  'Health': 'bg-rose-500',
  'Salary': 'bg-emerald-500',
};

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="glass-card flex flex-col h-full group">
      <div className="p-8 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl tracking-tight">Recent Activity</h3>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Real-time Transaction History</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-gray-900 transition-all">
              <Search size={18} />
            </button>
            <button className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-gray-900 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {transactions.slice(0, 6).map((transaction, index) => {
            const Icon = CATEGORY_ICONS[transaction.category] || ShoppingBag;
            const bgColor = CATEGORY_COLORS[transaction.category] || 'bg-gray-500';

            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group/item border border-transparent hover:border-gray-100 dark:hover:border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${bgColor} text-white shadow-sm ring-4 ring-white dark:ring-gray-900 group-hover/item:scale-110 transition-transform`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover/item:text-blue-500 transition-colors uppercase tracking-tight">{transaction.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{transaction.category}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-sm font-black tracking-tight ${
                    transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                  <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <MoreVertical size={14} className="text-gray-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="p-8 mt-auto">
        <button className="w-full py-4 rounded-2xl bg-gray-900 dark:bg-white/10 text-white dark:text-gray-300 text-xs font-black uppercase tracking-[0.2em] hover:bg-black dark:hover:bg-white/20 active:scale-[0.98] transition-all">
          View All Transactions
        </button>
      </div>
    </div>
  );
}
