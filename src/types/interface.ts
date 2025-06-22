export type ExpenseDetails = {
  date: string;
  category: string;
  amount: string;
  notes: string;
  userId: string;
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
