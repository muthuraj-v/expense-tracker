import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Nav from "../components/Nav/Nav";
import { MdOutlineCalendarMonth, MdOutlineToday } from "react-icons/md";
import DetailsCard from "../components/DetailsCard";
import Card from "../components/Card";
import { BsCalendar2Week } from "react-icons/bs";
import History from "../components/History";
import { useNavigate } from "react-router-dom";
import { ExpenseDetails } from "../types/interface";
import PopUp from "../components/Popup";
import ConfirmDialog from "../components/ConfirmDialog";
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

// const parseDate = (dateStr: string): string => {
//   const iso = new Date(dateStr);
//   if (!isNaN(iso.getTime())) return iso.toString();

//   const [day, month, year] = dateStr.split("-");
//   const normalized = new Date(`${year}-${month}-${day}`);
//   return normalized.toString();
// };

const Transaction: React.FC = () => {
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDetails | null>(
    null
  );
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const [data, setData] = useState<Expense[]>();
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

      const total = fetchedExpense?.reduce((acc: number, curr: Expense) => {
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

  const toatalToday = data?.filter((item) => item.date === currentDate);
  const todayExpense = toatalToday?.reduce((acc: number, curr: Expense) => {
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
  const handleDelete = async (expenseToDelete: ExpenseDetails) => {
    try {
      // Replace with your real API endpoint:

      const response = await fetch(
        import.meta.env.VITE_API_URL + `/expense/delete/${expenseToDelete._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setData((prev) =>
        prev?.filter((expense) => expense._id !== expenseToDelete._id)
      );
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      queryClient.invalidateQueries({ queryKey: ["total"] });
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense. Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
    notes: "",
    userId: "",
    _id: "",
  });
  const [openEditPopUp, setOpenEditPopUp] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseDetails | null>(
    null
  );

  const parseDate = (dateStr: string) => {
    return new Date(dateStr).toISOString().split("T")[0];
  };
  const handleEdit = (expense: ExpenseDetails) => {
    console.log(editingExpense);

    setEditingExpense(expense);
    setFormData({
      date: parseDate(expense.date),
      amount: expense.amount,
      userId: expense.userId,
      category: expense.category,
      paymentMethod: expense.paymentMethod,
      notes: expense.notes,
      _id: expense._id,
    });
    setOpenEditPopUp(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdate = async (updatedExpense: ExpenseDetails) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/expense/update/${updatedExpense._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedExpense),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      const result = await response.json();

      setData((prev) =>
        prev?.map((expense) =>
          expense._id === updatedExpense._id ? result.data : expense
        )
      );

      alert("Expense updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      queryClient.invalidateQueries({ queryKey: ["total"] });
      setOpenEditPopUp(false);
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense. Please try again.");
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(formData);
  };
  const handleDeleteClick = (expense: ExpenseDetails) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };
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
                amount={todayExpense?.toString() || "0"}
                nav={<MdOutlineToday />}
              />
              <Card
                name={"This Week"}
                amount={totalCurrentWeekSpend?.toString() || "0"}
                nav={<BsCalendar2Week />}
              />
              <Card
                name={"Total This Month"}
                amount={totalCurrentMonthSpend?.toString() || "0"}
                nav={<MdOutlineCalendarMonth />}
              />
            </div>
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
              <div className="p-5">
                {noData ? (
                  <p className="text-gray-400">No expense data available.</p>
                ) : (
                  expensesToRender
                    .slice()
                    .reverse()
                    .map((expense, index) => (
                      <DetailsCard
                        key={index}
                        onDelete={handleDeleteClick}
                        onEdit={handleEdit}
                        expense={{ ...expense, date: parseDate(expense.date) }}
                      />
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUp
        openPopUp={openEditPopUp}
        closePopUp={() => setOpenEditPopUp(false)}
        data={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          if (selectedExpense) handleDelete(selectedExpense);
        }}
        title="Delete Expense"
        message="Are you sure you want to delete this expense?"
      />
    </>
  );
};

export default Transaction;
