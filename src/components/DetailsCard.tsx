import React, { JSX } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { ExpenseDetails } from "../types/interface";
import { FaEdit } from "react-icons/fa";

import {
  FaHome,
  FaMobileAlt,
  FaUsers,
  FaExchangeAlt,
  FaPiggyBank,
  FaUtensils,
  FaBolt,
  FaSuitcase,
  FaQuestionCircle,
  FaTrashAlt,
} from "react-icons/fa";

type Props = {
  expense?: ExpenseDetails;
  onDelete?: (expense: ExpenseDetails) => void;
  onEdit?: (expense: ExpenseDetails) => void;
};

const categoryIcons: Record<string, JSX.Element> = {
  Food: <FaUtensils />,
  Rent: <FaHome />,
  Groceries: <TiShoppingCart />,
  Utilities: <FaBolt />,
  Travel: <FaSuitcase />,
  Mobile: <FaMobileAlt />,
  Family: <FaUsers />,
  Transfer: <FaExchangeAlt />,
  Save: <FaPiggyBank />,
  Other: <FaQuestionCircle />,
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const DetailsCard: React.FC<Props> = ({ expense, onDelete, onEdit }) => {
  if (!expense) return null;

  const { date, category, amount, notes } = expense;
  const icon = categoryIcons[category] || <FaQuestionCircle />;

  const handleDelete = () => {
    if (onDelete) onDelete(expense);
  };

  return (
    <div className="max-w-[700px] flex flex-wrap mt-2.5 bg-gray-50 rounded-lg shadow-sm p-3 animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-forwards">
      <div className="flex items-center space-x-4 w-full flex-wrap">
        <div className="w-12 h-12 p-2 rounded-md bg-gray-100 shadow-sm flex flex-col items-center justify-center">
          <span className="text-gray-800 text-xs font-semibold leading-tight text-center">
            {formatDate(date)}
          </span>
        </div>

        <div className="w-12 h-12 p-2 rounded-md bg-gray-200 flex items-center justify-center">
          <span className="text-black text-xl">{icon}</span>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-gray-800">{category}</p>
          <p className="text-xs text-gray-500">{notes}</p>
        </div>

        <div className="flex flex-col justify-center ml-auto pr-2">
          <p className="text-sm font-semibold text-gray-800">Debited Amount</p>
          <p className="text-[17px] text-red-500 text-center">-{amount}</p>
        </div>
        <button
          onClick={() => onEdit?.(expense)}
          className="ml-2 p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors"
          aria-label="Edit Expense"
          title="Edit Expense"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="ml-3 p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors"
          aria-label="Delete Expense"
          title="Delete Expense"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default DetailsCard;
