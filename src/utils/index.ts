import { Transaction, MonthlyData, CategorySpending, Insight } from '@/types';
import { CATEGORY_COLORS } from '@/data/transactions';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function getTotalBalance(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);
}

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthMap = new Map<string, { income: number; expenses: number }>();

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const current = monthMap.get(key) || { income: 0, expenses: 0 };

    if (t.type === 'income') {
      current.income += t.amount;
    } else {
      current.expenses += t.amount;
    }

    monthMap.set(key, current);
  });

  const sortedKeys = Array.from(monthMap.keys()).sort();
  let runningBalance = 0;

  return sortedKeys.map((key) => {
    const data = monthMap.get(key)!;
    runningBalance += data.income - data.expenses;
    const [year, month] = key.split('-');
    const monthLabel = new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    });

    return {
      month: monthLabel,
      income: Math.round(data.income * 100) / 100,
      expenses: Math.round(data.expenses * 100) / 100,
      balance: Math.round(runningBalance * 100) / 100,
    };
  });
}

export function getCategorySpending(transactions: Transaction[]): CategorySpending[] {
  const categoryMap = new Map<string, number>();

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.amount);
    });

  return Array.from(categoryMap.entries())
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
      color: CATEGORY_COLORS[name] || '#6b7280',
    }))
    .sort((a, b) => b.value - a.value);
}

export function getInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];

  // 1. Highest spending category
  const categorySpending = getCategorySpending(transactions);
  if (categorySpending.length > 0) {
    const highest = categorySpending[0];
    insights.push({
      title: 'Top Spending Category',
      value: highest.name,
      description: `You spent ${formatCurrency(highest.value)} on ${highest.name} — your highest expense category.`,
      trend: 'neutral',
    });
  }

  // 2. Monthly comparison
  const monthlyData = getMonthlyData(transactions);
  if (monthlyData.length >= 2) {
    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    const change = current.expenses - previous.expenses;
    const percentChange =
      previous.expenses > 0 ? ((change / previous.expenses) * 100).toFixed(1) : '0';

    insights.push({
      title: 'Monthly Comparison',
      value: `${Number(percentChange) >= 0 ? '+' : ''}${percentChange}%`,
      description:
        Number(percentChange) >= 0
          ? `Spending increased by ${Math.abs(Number(percentChange))}% compared to last month.`
          : `Spending decreased by ${Math.abs(Number(percentChange))}% compared to last month.`,
      trend: Number(percentChange) >= 0 ? 'up' : 'down',
    });
  }

  // 3. Savings rate
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  if (totalIncome > 0) {
    const savingsRate = (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1);
    insights.push({
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      description:
        Number(savingsRate) >= 20
          ? `Great! You're saving ${savingsRate}% of your income.`
          : `You're saving ${savingsRate}% of income. Aim for at least 20%.`,
      trend: Number(savingsRate) >= 20 ? 'down' : 'up',
    });
  }

  return insights;
}

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
