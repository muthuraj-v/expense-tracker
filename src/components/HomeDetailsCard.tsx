import React, { JSX } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { ExpenseDetails as Expense } from "../types/interface";
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
} from "react-icons/fa";

type Props = {
  expense?: Expense;
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

const HomeDetailsCard: React.FC<Props> = ({ expense }) => {
  if (!expense) return null;

  const { date, category, amount, notes } = expense;
  const icon = categoryIcons[category] || <FaQuestionCircle />;

  return (
    <div className="max-w-full flex ">
      <div className="flex space-x-4 m-2">
        <div className="p-3 rounded-xl bg-red-100 ">
          <span className="text-purple-700 text-center text-2xl">{icon}</span>
        </div>
        <div className="flex-col space-x-0.5">
          <p className="text-base font-medium">{category}</p>
          <p className="txt-xs text-gray-400">
            <span>{formatDate(date)}&nbsp;</span>
            <span>{notes}&nbsp;</span>
            <span>- ₹{parseFloat(amount).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeDetailsCard;
