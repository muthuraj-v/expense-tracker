import React from "react";
import Nav from "../components/Nav/Nav";
import BarChart from "../components/BarChart";
import HighExpenseChart from "../components/HighExpenseChart";
import History from "../components/History";

const Reports: React.FC = () => {
  const data = [
    {
      date: "2025-06-02",
      amount: "12000",
      category: "Family",
      notes: "21212",
      paymentMethod: "online",
      userId: "1",
      createdAt: {
        $date: "2025-06-02T16:05:04.355Z",
      },
      updatedAt: {
        $date: "2025-06-02T16:05:04.355Z",
      },
      __v: 0,
    },
    {
      date: "2025-06-02",
      amount: "12000",
      category: "Family",
      notes: "21212",
      paymentMethod: "online",
      userId: "1",
      createdAt: {
        $date: "2025-06-02T16:05:04.355Z",
      },
      updatedAt: {
        $date: "2025-06-02T16:05:04.355Z",
      },
      __v: 0,
    },
  ];

  type GroupedExpense = {
    category: string;
    amount: number;
  };
  const groupedExpenses: GroupedExpense[] = data
    .map((item) => ({
      category: item.category,
      amount: Number(item.amount),
    }))
    .reduce((acc, curr) => {
      const category = curr.category;
      const amount =
        typeof curr.amount === "string" ? parseFloat(curr.amount) : curr.amount;

      const existing = acc.find((item) => item.category === category);

      if (existing) {
        existing.amount += amount;
      } else {
        acc.push({ category, amount });
      }

      return acc;
    }, [] as GroupedExpense[]);

  const expenseNumber = groupedExpenses.map((list) => list.amount);
  const expenseList = groupedExpenses.map((list) => list.category);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white">
      <Nav />
      <div className="grow m-3">
        <History />
        <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
          <h2 className="font-bold text-2xl sm:text-3xl text-[#333] mb-8">
            Reports
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <BarChart expenses={expenseNumber} list={expenseList} />
            </div>
            <div className="w-full">
              <HighExpenseChart expenses={groupedExpenses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
