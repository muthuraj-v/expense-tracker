import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Nav from "../components/Nav/Nav";
import { MdOutlineCalendarMonth, MdOutlineToday } from "react-icons/md";
import DetailsCard from "../components/DetailsCard";
import Card from "../components/Card";
import { BsCalendar2Week } from "react-icons/bs";
import History from "../components/History";
import { useNavigate } from "react-router-dom";
type Expense = {
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

const parseDate = (dateStr: string): string => {
  const iso = new Date(dateStr);
  if (!isNaN(iso.getTime())) return iso.toString();

  const [day, month, year] = dateStr.split("-");
  const normalized = new Date(`${year}-${month}-${day}`);
  return normalized.toString();
};

const Transaction: React.FC = () => {
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
  const navigate = useNavigate();
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const [data, setData] = useState<Expense[]>([
    {
      date: "2025-06-19",
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
  ]);
  const [totalExpense, setTotalExpense] = useState(0);
  console.log(totalExpense);

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

  const {
    data: fetchedExpense,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["expense"],
    queryFn: fetchData,
    staleTime: 5000,
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
  const expensesToRender = isFiltterd ? filteredData : data;
  const noData = !expensesToRender || expensesToRender.length === 0;
  // const date = new Date();
  // const todayExDate = date.getDate();
  // const todayDate = `${date.getFullYear()}-${
  //   date.getMonth() + 1
  // }-${date.getDate()}`;
  // console.log(todayDate);
  const currentDate = new Date().toISOString().split("T")[0];

  const toatalToday = data.filter((item) => item.date === currentDate);
  const todayExpense = toatalToday.reduce((acc: number, curr: Expense) => {
    const amount = parseFloat(curr.amount);
    return isNaN(amount) ? acc : acc + amount;
  }, 0);
  const currentMonth = new Date().getMonth();
  const filteredCurrentMonth = data?.filter(
    (item) => new Date(item.date).getMonth() === currentMonth
  );
  const totalCurrentMonthSpend = filteredCurrentMonth?.reduce(
    (acc, current) => acc + parseInt(current.amount),
    0
  );
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  if (startOfWeek.getDay() === 0) {
    startOfWeek.setHours(0, 0, 0, 0);
  } else {
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    startOfWeek.setHours(0, 0, 0, 0);
  }

  const filteredCurrentWeek = data?.filter(
    (item) => new Date(item.date) >= startOfWeek
  );

  const totalCurrentWeekSpend = filteredCurrentWeek?.reduce(
    (acc, current) => acc + parseInt(current.amount),
    0
  );
  return (
    <>
      <div className="flex flex-col overflow-hidden ">
        <>
          <Nav />
        </>

        <div className="grow m-3 relative">
          <History />
          <div className="pr-7 absolute z-1000  right-0 text-black">
            <button
              className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm cursor-pointer rounded-xl shadow-md transition duration-200 ease-in-out"
              onClick={() => navigate("/add_transaction")}
            >
              Add Transaction
            </button>
          </div>
          <div className="p-4 sm:p-5 max-w-8xl">
            <h2 className="font-bold text-2xl sm:text-3xl text-[#333] ">
              Your Transactions
            </h2>
            <div className="mt-5 flex flex-col sm:flex-col md:flex-col lg:flex-row gap-7">
              <Card
                name={"Today"}
                amount={todayExpense.toString() || "0"}
                nav={<MdOutlineToday />}
              />
              <Card
                name={"This Week"}
                amount={totalCurrentWeekSpend.toString() || "0"}
                nav={<BsCalendar2Week />}
              />
              <Card
                name={"Total This Month"}
                amount={totalCurrentMonthSpend.toString() || "0"}
                nav={<MdOutlineCalendarMonth />}
              />
            </div>
            <div className="mt-6">
              <div className="p-2 ml-1">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
                  <div className="flex flex-col text-sm w-[120px]">
                    <label
                      htmlFor="month"
                      className="mb-1 text-gray-700 font-medium"
                    >
                      Filter by Month:
                    </label>
                    <select
                      id="month"
                      value={selectedMonth}
                      onChange={(e) => {
                        setSelectedMonth(Number(e.target.value));
                        setSelectedDate("");
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col text-sm w-[120px]">
                    <label
                      htmlFor="year"
                      className="mb-1 text-gray-700 font-medium"
                    >
                      Filter by Year:
                    </label>
                    <select
                      id="year"
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(Number(e.target.value));
                        setSelectedDate("");
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {generateYears().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col text-sm w-[120px]">
                    <label
                      htmlFor="date"
                      className="mb-1 text-gray-700 font-medium"
                    >
                      Filter by Date :
                    </label>
                    <select
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Dates</option>
                      {Array.from(
                        { length: getDaysInMonth(selectedMonth, selectedYear) },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col text-sm w-[120px]">
                    <label
                      htmlFor="category"
                      className="mb-1 text-gray-700 font-medium"
                    >
                      Category :
                    </label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All</option>
                      <option value="Food">Food</option>
                      <option value="Rent">Rent</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Travel">Travel</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Family">Family</option>
                      <option value="Transfer">Transfer</option>
                      <option value="Save">Saveings</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => setIsFilttered((prev) => !prev)}
                    >
                      Filtter
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => setIsFilttered((prev) => !prev)}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                {noData ? (
                  <p className="text-gray-400">No expense data available.</p>
                ) : (
                  expensesToRender.map((expense, index) => (
                    <DetailsCard
                      key={index}
                      expense={{ ...expense, date: parseDate(expense.date) }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
