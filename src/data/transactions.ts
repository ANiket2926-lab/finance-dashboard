import { Transaction } from '@/types';

export const CATEGORY_COLORS: Record<string, string> = {
  'Salary': '#6366f1',
  'Freelance': '#8b5cf6',
  'Investment': '#06b6d4',
  'Food & Dining': '#f97316',
  'Shopping': '#ec4899',
  'Transportation': '#14b8a6',
  'Entertainment': '#f59e0b',
  'Bills & Utilities': '#ef4444',
  'Healthcare': '#10b981',
  'Education': '#3b82f6',
  'Travel': '#a855f7',
  'Other': '#6b7280',
};

export const CATEGORIES = Object.keys(CATEGORY_COLORS);

export const mockTransactions: Transaction[] = [
  // January 2025
  { id: '1', date: '2025-01-05', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '2', date: '2025-01-08', description: 'Grocery Store', amount: 142.50, type: 'expense', category: 'Food & Dining' },
  { id: '3', date: '2025-01-10', description: 'Electric Bill', amount: 89.99, type: 'expense', category: 'Bills & Utilities' },
  { id: '4', date: '2025-01-12', description: 'Freelance Project', amount: 850, type: 'income', category: 'Freelance' },
  { id: '5', date: '2025-01-15', description: 'Online Shopping', amount: 234.00, type: 'expense', category: 'Shopping' },
  { id: '6', date: '2025-01-18', description: 'Uber Rides', amount: 45.30, type: 'expense', category: 'Transportation' },
  { id: '7', date: '2025-01-22', description: 'Netflix Subscription', amount: 15.99, type: 'expense', category: 'Entertainment' },
  { id: '8', date: '2025-01-25', description: 'Restaurant Dinner', amount: 78.50, type: 'expense', category: 'Food & Dining' },

  // February 2025
  { id: '9', date: '2025-02-05', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '10', date: '2025-02-07', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'Bills & Utilities' },
  { id: '11', date: '2025-02-10', description: 'Doctor Visit', amount: 150, type: 'expense', category: 'Healthcare' },
  { id: '12', date: '2025-02-14', description: 'Valentine Dinner', amount: 195.00, type: 'expense', category: 'Food & Dining' },
  { id: '13', date: '2025-02-16', description: 'Stock Dividend', amount: 320, type: 'income', category: 'Investment' },
  { id: '14', date: '2025-02-20', description: 'Gas Station', amount: 52.40, type: 'expense', category: 'Transportation' },
  { id: '15', date: '2025-02-22', description: 'Movie Tickets', amount: 32.00, type: 'expense', category: 'Entertainment' },
  { id: '16', date: '2025-02-28', description: 'Online Course', amount: 199.99, type: 'expense', category: 'Education' },

  // March 2025
  { id: '17', date: '2025-03-05', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '18', date: '2025-03-08', description: 'Grocery Shopping', amount: 167.80, type: 'expense', category: 'Food & Dining' },
  { id: '19', date: '2025-03-10', description: 'Freelance Web Dev', amount: 1200, type: 'income', category: 'Freelance' },
  { id: '20', date: '2025-03-12', description: 'Phone Bill', amount: 75.00, type: 'expense', category: 'Bills & Utilities' },
  { id: '21', date: '2025-03-15', description: 'New Headphones', amount: 299.99, type: 'expense', category: 'Shopping' },
  { id: '22', date: '2025-03-18', description: 'Train Pass', amount: 120.00, type: 'expense', category: 'Transportation' },
  { id: '23', date: '2025-03-22', description: 'Concert Tickets', amount: 85.00, type: 'expense', category: 'Entertainment' },
  { id: '24', date: '2025-03-25', description: 'Pharmacy', amount: 34.50, type: 'expense', category: 'Healthcare' },
  { id: '25', date: '2025-03-28', description: 'Weekend Trip', amount: 450.00, type: 'expense', category: 'Travel' },

  // April 2025
  { id: '26', date: '2025-04-05', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: '27', date: '2025-04-07', description: 'Grocery Store', amount: 155.20, type: 'expense', category: 'Food & Dining' },
  { id: '28', date: '2025-04-10', description: 'Electric Bill', amount: 95.00, type: 'expense', category: 'Bills & Utilities' },
  { id: '29', date: '2025-04-12', description: 'Freelance Design', amount: 650, type: 'income', category: 'Freelance' },
  { id: '30', date: '2025-04-15', description: 'Spring Clothes', amount: 310.00, type: 'expense', category: 'Shopping' },
  { id: '31', date: '2025-04-18', description: 'Bus Pass', amount: 85.00, type: 'expense', category: 'Transportation' },
  { id: '32', date: '2025-04-20', description: 'Spotify Premium', amount: 11.99, type: 'expense', category: 'Entertainment' },
  { id: '33', date: '2025-04-22', description: 'Sushi Restaurant', amount: 62.00, type: 'expense', category: 'Food & Dining' },
  { id: '34', date: '2025-04-25', description: 'Mutual Fund Return', amount: 180, type: 'income', category: 'Investment' },
  { id: '35', date: '2025-04-28', description: 'Gym Membership', amount: 49.99, type: 'expense', category: 'Healthcare' },

  // May 2025
  { id: '36', date: '2025-05-05', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: '37', date: '2025-05-08', description: 'Supermarket', amount: 178.90, type: 'expense', category: 'Food & Dining' },
  { id: '38', date: '2025-05-10', description: 'Water Bill', amount: 42.00, type: 'expense', category: 'Bills & Utilities' },
  { id: '39', date: '2025-05-12', description: 'Freelance Content', amount: 480, type: 'income', category: 'Freelance' },
  { id: '40', date: '2025-05-14', description: 'Electronics Store', amount: 549.99, type: 'expense', category: 'Shopping' },
  { id: '41', date: '2025-05-18', description: 'Taxi Rides', amount: 38.50, type: 'expense', category: 'Transportation' },
  { id: '42', date: '2025-05-20', description: 'Theme Park', amount: 120.00, type: 'expense', category: 'Entertainment' },
  { id: '43', date: '2025-05-22', description: 'Textbooks', amount: 89.99, type: 'expense', category: 'Education' },
  { id: '44', date: '2025-05-25', description: 'Dental Checkup', amount: 200, type: 'expense', category: 'Healthcare' },
  { id: '45', date: '2025-05-28', description: 'Stock Gains', amount: 425, type: 'income', category: 'Investment' },

  // June 2025
  { id: '46', date: '2025-06-05', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: '47', date: '2025-06-08', description: 'Farmer\'s Market', amount: 92.30, type: 'expense', category: 'Food & Dining' },
  { id: '48', date: '2025-06-10', description: 'Gas Bill', amount: 67.50, type: 'expense', category: 'Bills & Utilities' },
  { id: '49', date: '2025-06-12', description: 'Freelance App Dev', amount: 1500, type: 'income', category: 'Freelance' },
  { id: '50', date: '2025-06-15', description: 'Summer Sale Shopping', amount: 425.00, type: 'expense', category: 'Shopping' },
  { id: '51', date: '2025-06-18', description: 'Flight Booking', amount: 380.00, type: 'expense', category: 'Travel' },
  { id: '52', date: '2025-06-20', description: 'Gaming Subscription', amount: 14.99, type: 'expense', category: 'Entertainment' },
  { id: '53', date: '2025-06-22', description: 'Cafe Lunch', amount: 28.50, type: 'expense', category: 'Food & Dining' },
  { id: '54', date: '2025-06-25', description: 'Workshop Fee', amount: 150, type: 'expense', category: 'Education' },
  { id: '55', date: '2025-06-28', description: 'Bond Interest', amount: 275, type: 'income', category: 'Investment' },
];
