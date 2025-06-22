import React from "react";
import Nav from "../components/Nav/Nav";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import History from "../components/History";

const AddTransaction: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<"Expense" | "Income">(
    "Expense"
  );

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden bg-white">
        <Nav />

        <div className="grow m-3">
          <History />

          <div className="p-4 sm:p-6 max-w-8xl ">
            <div className=" p-2">
              <h2 className="font-bold text-2xl sm:text-3xl text-[#333]">
                Add Transaction
              </h2>
              <div className="mt-7">
                <div className="flex gap-6 border-b border-gray-300">
                  <button
                    className={`relative pb-2 transition-colors duration-300 ${
                      currentPage === "Expense"
                        ? "border-b-2 border-[#333] text-[#333]"
                        : "border-b-2 border-transparent text-gray-500 hover:text-[#333] hover:border-[#ccc]"
                    }`}
                    onClick={() => setCurrentPage("Expense")}
                  >
                    Expense
                  </button>
                  <button
                    className={`relative pb-2 transition-colors duration-300 ${
                      currentPage === "Income"
                        ? "border-b-2 border-[#333] text-[#333]"
                        : "border-b-2 border-transparent text-gray-500 hover:text-[#333] hover:border-[#ccc]"
                    }`}
                    onClick={() => setCurrentPage("Income")}
                  >
                    Income
                  </button>
                </div>
                {currentPage === "Expense" ? <ExpenseForm /> : <IncomeForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTransaction;
