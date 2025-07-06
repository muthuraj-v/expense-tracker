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
  totalExpense: number;
}
export interface User {
  _id: string;
  userName: string;
  email: string;
  avatar?: string; // optional, since it's currently empty
  googleId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}
export interface UserApiResponse {
  user: User;
}
