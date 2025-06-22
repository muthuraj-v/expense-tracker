import axios from "axios";
import React, { useState } from "react";
import { Income } from "../types/interface";
const IncomeForm: React.FC = () => {
  const [data, setData] = useState<Income>({
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
        .post<Income>(import.meta.env.VITE_API_URL + "/icome/add", data, {
          withCredentials: true,
        })
        .then((data) =>
          data.status === 200 ? alert("Income Added") : alert(data.data)
        )
        .catch((e) => alert(e));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
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
            className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#999] transition"
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
              className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-[#999] transition appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            name="category"
            id="category"
            required
            value={data.category}
            onChange={handleChange}
            className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#999] transition"
          >
            <option value="" selected disabled>
              Select Category
            </option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investments">Investments</option>
            <option value="Gift">Gift</option>
            <option value="Interest">Interest</option>
            <option value="Refund">Refund</option>
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
            name="paymentMethod"
            id="paymentMethod"
            required
            value={data.paymentMethod}
            onChange={handleChange}
            className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#999] transition"
          >
            <option value="" selected disabled>
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
            required
            value={data.notes}
            onChange={handleChange}
            placeholder="Add notes about this Transaction"
            className="w-full border border-[#CCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#999] transition"
          />
        </div>

        <div className="w-full max-w-2xl mt-10 ml-auto">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Income
          </button>
        </div>
      </form>
    </>
  );
};

export default IncomeForm;
