export type ExpenseDetails = {
  paymentMethod: string;
  date: string;
  category: string;
  amount: string;
  notes: string;
  userId: string;
  _id: string;
};
export interface Expense {
  date: string;
  amount: string;
  category: string;
  paymentMethod: string;
  notes: string;
}
export interface Income {
  date: string;
  amount: string;
  category: string;
  paymentMethod: string;
  notes: string;
}

export interface TotalExpense {
  month: string;
  userId: {};
  totalIncome: number;
  totalIncome1: number;
  totalExpense: number;
}
export interface User {
  _id: string;
  userName: string;
  email: string;
  avatar?: string;
  googleId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface UserApiResponse {
  user: User;
}
export interface Saving {
  _id: string;
  date: string;
  amount: string;
  category: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
