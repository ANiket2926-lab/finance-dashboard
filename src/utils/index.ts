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

// ─── Per-Month Category Spending (for smart comparisons) ─────────────────────

function getCategorySpendingByMonth(transactions: Transaction[]): Map<string, Map<string, number>> {
  const result = new Map<string, Map<string, number>>();

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!result.has(monthKey)) result.set(monthKey, new Map());
      const catMap = result.get(monthKey)!;
      catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount);
    });

  return result;
}

function getTransactionCountByCategory(transactions: Transaction[], category: string, monthKey: string): number {
  return transactions.filter((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return t.type === 'expense' && t.category === category && key === monthKey;
  }).length;
}

// ─── Smart Insights ──────────────────────────────────────────────────────────

export function getInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];

  if (transactions.length === 0) return insights;

  const categorySpending = getCategorySpending(transactions);
  const monthlyData = getMonthlyData(transactions);
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const monthlyCategories = getCategorySpendingByMonth(transactions);
  const sortedMonths = Array.from(monthlyCategories.keys()).sort();

  // ── 1. Top Spending Category with smart sentence ──────────────────────────

  if (categorySpending.length > 0) {
    const highest = categorySpending[0];
    const totalExp = categorySpending.reduce((s, c) => s + c.value, 0);
    const share = totalExp > 0 ? ((highest.value / totalExp) * 100).toFixed(0) : '0';

    let smartSentence = `You spent ${formatCurrency(highest.value)} on ${highest.name}, accounting for ${share}% of total expenses.`;

    // Add month-over-month detail for top category
    if (sortedMonths.length >= 2) {
      const currMonth = sortedMonths[sortedMonths.length - 1];
      const prevMonth = sortedMonths[sortedMonths.length - 2];
      const currVal = monthlyCategories.get(currMonth)?.get(highest.name) || 0;
      const prevVal = monthlyCategories.get(prevMonth)?.get(highest.name) || 0;

      if (prevVal > 0) {
        const catChange = ((currVal - prevVal) / prevVal * 100).toFixed(0);
        const txCount = getTransactionCountByCategory(transactions, highest.name, currMonth);
        const direction = Number(catChange) >= 0 ? 'increased' : 'decreased';
        const driver = txCount > 2 ? `, driven by ${txCount} transactions this month` : '';
        smartSentence = `Your ${highest.name} spending ${direction} by ${Math.abs(Number(catChange))}% compared to last month${driver}.`;
      }
    }

    insights.push({
      title: 'Top Spending Category',
      value: highest.name,
      description: smartSentence,
      trend: 'neutral',
    });
  }

  // ── 2. Monthly Comparison with contextual detail ──────────────────────────

  if (monthlyData.length >= 2) {
    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    const change = current.expenses - previous.expenses;
    const percentChange = previous.expenses > 0
      ? ((change / previous.expenses) * 100).toFixed(1)
      : '0';
    const pct = Number(percentChange);

    // Find category that changed the most
    let driverSentence = '';
    if (sortedMonths.length >= 2) {
      const currMonth = sortedMonths[sortedMonths.length - 1];
      const prevMonth = sortedMonths[sortedMonths.length - 2];
      const currCats = monthlyCategories.get(currMonth);
      const prevCats = monthlyCategories.get(prevMonth);

      if (currCats && prevCats) {
        let maxDelta = 0;
        let driverCat = '';
        const allCats = new Set([...currCats.keys(), ...prevCats.keys()]);
        allCats.forEach((cat) => {
          const delta = (currCats.get(cat) || 0) - (prevCats.get(cat) || 0);
          if (Math.abs(delta) > Math.abs(maxDelta)) {
            maxDelta = delta;
            driverCat = cat;
          }
        });
        if (driverCat) {
          const driverDir = maxDelta > 0 ? 'higher' : 'lower';
          driverSentence = ` ${driverCat} spending was ${driverDir} by ${formatCurrency(Math.abs(maxDelta))}.`;
        }
      }
    }

    const direction = pct >= 0 ? 'increased' : 'decreased';
    insights.push({
      title: 'Monthly Comparison',
      value: `${pct >= 0 ? '+' : ''}${percentChange}%`,
      description: `Spending ${direction} by ${Math.abs(pct)}% compared to last month.${driverSentence}`,
      trend: pct >= 0 ? 'up' : 'down',
    });
  }

  // ── 3. Savings Rate with actionable advice ────────────────────────────────

  if (totalIncome > 0) {
    const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100);
    const rateStr = savingsRate.toFixed(1);

    let advice: string;
    if (savingsRate >= 30) {
      advice = `Excellent discipline! You're saving ${rateStr}% of your income — well above the recommended 20%.`;
    } else if (savingsRate >= 20) {
      advice = `Great job! You're saving ${rateStr}% of your income, meeting the recommended target.`;
    } else if (savingsRate >= 10) {
      advice = `You're saving ${rateStr}% of your income. Try cutting discretionary spending to reach the 20% target.`;
    } else if (savingsRate >= 0) {
      advice = `Your savings rate is ${rateStr}%. Consider reviewing your top expense categories to improve this.`;
    } else {
      advice = `You're spending more than you earn (${rateStr}% savings rate). Review expenses urgently.`;
    }

    insights.push({
      title: 'Savings Rate',
      value: `${rateStr}%`,
      description: advice,
      trend: savingsRate >= 20 ? 'down' : 'up',
    });
  }

  return insights;
}

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
