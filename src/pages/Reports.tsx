import React, { useMemo, useState } from "react";
import Nav from "../components/Nav/Nav";
import BarChart from "../components/BarChart";
import HighExpenseChart from "../components/HighExpenseChart";
import History from "../components/History";
import { useQuery } from "@tanstack/react-query";
import Filter from "../components/Filter";
type Expense = {
  _id: string;
  date: string;
  category: string;
  amount: string;
  notes: string;
  paymentMethod: string;
  userId: string;
  updatedAt: {};
  createdAt: {};
  __v: number;
};

const Reports: React.FC = () => {
  // const [data, setData] = useState<Expense[]>();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFiltterd, setIsFilttered] = useState(false);
  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = 2023; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };
  async function fetchData(): Promise<Expense[]> {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/expense/data",
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  }
  const {
    data: fetchedExpense,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["expense"],
    queryFn: fetchData,
    staleTime: Infinity,
  });
  const data = useMemo(() => {
    if (!fetchedExpense) return [];
    return fetchedExpense;
  }, [fetchedExpense]);
  type GroupedExpense = {
    category: string;
    amount: number;
  };

  const filteredData = data?.filter((item) => {
    const expenseDate = new Date(item.date);
    const matchesMonth = expenseDate.getMonth() + 1 === selectedMonth;
    const matchesYear = expenseDate.getFullYear() === selectedYear;
    const matchesDate = selectedDate
      ? expenseDate.getDate() === Number(selectedDate)
      : true;
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;

    return matchesMonth && matchesYear && matchesDate && matchesCategory;
  });
  const expensesToRender = isFiltterd ? filteredData : data;
  const noData = !expensesToRender || expensesToRender.length === 0;
  const groupedExpenses: GroupedExpense[] = expensesToRender
    ?.map((item) => ({
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
          <div className="mt-6">
            <div className="p-2 ml-1">
              <Filter
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setIsFilttered={setIsFilttered}
                generateYears={generateYears}
                getDaysInMonth={getDaysInMonth}
              />
            </div>
          </div>
          {noData ? (
            <p className="text-gray-400">No expense data available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-6">
              <div className="w-full">
                <BarChart expenses={expenseNumber} list={expenseList} />
              </div>
              <div className="w-full">
                <HighExpenseChart expenses={groupedExpenses} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
