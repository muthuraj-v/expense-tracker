import React, { useState } from "react";
import axios from "axios";
import { Expense } from "../types/interface";

const ExpenseForm: React.FC = () => {
  const [data, setData] = useState<Expense>({
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      axios
        .post<Expense>(import.meta.env.VITE_API_URL + "/expense/add", data, {
          withCredentials: true,
        })
        .then((data) => {
          if (data.status === 200) {
            setData({
              date: "",
              amount: "",
              category: "",
              paymentMethod: "",
              notes: "",
            });
          }
          data.status === 200
            ? alert("Expense Added")
            : alert("failed process");
        })
        .catch((e) => alert(e));
      // const response = axios.post<Expense>(
      //   "http://localhost:2000/api/expense/add",
      //   data
      // );

      //  response.then((data) =>
      //   data.status === 200 ? alert("Expense Added") : alert("failed")
      // );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="w-full max-w-2xl">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          required
          value={data.date}
          onChange={handleChange}
          className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="w-full max-w-2xl mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount
        </label>
        <div className="relative">
          <input
            type="number"
            id="amount"
            min={0}
            required
            value={data.amount}
            onChange={handleChange}
            className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm pr-8"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
            ₹
          </span>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          required
          value={data.category}
          onChange={handleChange}
          className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select Category
          </option>
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

      <div className="w-full max-w-2xl mt-4">
        <label
          htmlFor="paymentMethod"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Payment Method
        </label>
        <select
          id="paymentMethod"
          required
          value={data.paymentMethod}
          onChange={handleChange}
          className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="cash">Cash</option>
          <option value="online">Online</option>
          <option value="netbanking">NetBanking</option>
          <option value="card">Card</option>
        </select>
      </div>

      <div className="w-full max-w-2xl mt-4">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Notes
        </label>
        <input
          type="text"
          id="notes"
          value={data.notes}
          maxLength={18}
          onChange={handleChange}
          placeholder="Add notes about this Transaction"
          className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="w-full max-w-2xl mt-10 ml-auto">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
