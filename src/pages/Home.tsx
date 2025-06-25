import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import HomeDetailsCard from "../components/HomeDetailsCard";
import Histroy from "../components/History";
import { useQuery } from "@tanstack/react-query";
import { ExpenseDetails as Expense, TotalExpense } from "../types/interface";
const parseDate = (dateStr: string): string => {
  const iso = new Date(dateStr);
  if (!isNaN(iso.getTime())) return iso.toString();

  const [day, month, year] = dateStr.split("-");
  const normalized = new Date(`${year}-${month}-${day}`);
  return normalized.toString();
};

const Home: React.FC = () => {
  const [data, setData] = useState<Expense[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);

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
  async function totalExpenseFetch(): Promise<TotalExpense[]> {
    const response = await fetch(import.meta.env.VITE_API_URL + "/total", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);

    return json;
  }
  const {
    data: fetchedExpense,
    //isLoading,
    // error,
  } = useQuery({
    queryKey: ["expense"],
    queryFn: fetchData,
    staleTime: 5000,
  });
  const { data: total } = useQuery({
    queryKey: ["total"],
    queryFn: totalExpenseFetch,
    staleTime: 100000,
  });
  useEffect(() => {
    if (fetchedExpense) {
      setData(fetchedExpense); // Set the fetched data as an array

      console.log(fetchedExpense);

      const total = fetchedExpense.reduce((acc: number, curr: Expense) => {
        const amount = parseFloat(curr.amount);
        return isNaN(amount) ? acc : acc + amount;
      }, 0);

      setTotalExpense(total);
    }
  }, [fetchedExpense]);
  useEffect(() => {
    if (total) {
      console.log(total);
    }
  }, [total]);
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <Nav />
        <div className="grow m-3">
          <Histroy />
          <div className="p-4 sm:p-6 max-w-6xl ">
            {/* <h2 className="text-blue-600 font-bold text-2xl sm:text-3xl">
              ExpenseTracker
            </h2> */}
            <p className="text-2xl font-bold mt-1">Financial Overview</p>
            <div className="mt-4 p-6 bg-purple-50 rounded-xl shadow-md">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <span
                    role="img"
                    className="text-purple-600 text-center text-xl"
                    aria-label="balance"
                  >
                    <MdAccountBalanceWallet />
                  </span>
                </div>
                <div>
                  <p className="text-md font-medium">Total Balance</p>
                  <p className="text-blue-600 font-bold text-2xl">
                    &#x20B9;4,285.75
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-6 bg-purple-50 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span
                      role="img"
                      className="text-purple-600 text-center text-xl"
                      aria-label="income"
                    >
                      <BsGraphUpArrow />
                    </span>
                  </div>
                  <div>
                    <p className="text-md font-medium">Income</p>
                    <p className="text-green-600 font-bold text-xl">
                      &#x20B9;2,850.00
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 bg-purple-50 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <span
                      role="img"
                      className="text-purple-600 text-center text-xl"
                      aria-label="expenses"
                    >
                      <BsGraphDownArrow />
                    </span>
                  </div>
                  <div>
                    <p className="text-md font-medium">Expenses</p>
                    <p className="text-red-500 font-bold text-xl">
                      &#x20B9;
                      {(totalExpense && totalExpense.toFixed(2)) || "1,245.50"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-[#333] font-bold text-base sm:text-lg">
                Recent Transactions
              </h3>

              {Array.isArray(data) && data.length > 0 ? (
                data.map((expense, index) => (
                  <HomeDetailsCard
                    key={index}
                    expense={{ ...expense, date: parseDate(expense.date) }}
                  />
                ))
              ) : (
                <p className="text-gray-400">No expense data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
