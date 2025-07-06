import React from "react";

type FilterProps = {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setIsFilttered: (isFiltered: boolean) => void;
  generateYears: () => number[];
  getDaysInMonth: (month: number, year: number) => number;
};

const Filter: React.FC<FilterProps> = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  selectedDate,
  setSelectedDate,
  selectedCategory,
  setSelectedCategory,
  setIsFilttered,
  generateYears,
  getDaysInMonth,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
      {/* Month */}
      <div className="flex flex-col text-sm w-[120px]">
        <label htmlFor="month" className="mb-1 text-gray-700 font-medium">
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

      {/* Year */}
      <div className="flex flex-col text-sm w-[120px]">
        <label htmlFor="year" className="mb-1 text-gray-700 font-medium">
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

      {/* Date */}
      <div className="flex flex-col text-sm w-[120px]">
        <label htmlFor="date" className="mb-1 text-gray-700 font-medium">
          Filter by Date:
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

      {/* Category */}
      <div className="flex flex-col text-sm w-[120px]">
        <label htmlFor="category" className="mb-1 text-gray-700 font-medium">
          Category:
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
          <option value="Save">Savings</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Buttons */}
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => setIsFilttered(true)}
        >
          Filter
        </button>
      </div>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => setIsFilttered(false)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
