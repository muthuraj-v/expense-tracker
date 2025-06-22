import React, { JSX } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { ExpenseDetails } from "../types/interface";
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
  expense?: ExpenseDetails;
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

const DetailsCard: React.FC<Props> = ({ expense }) => {
  if (!expense) return null;

  const { date, category, amount, notes } = expense;
  const icon = categoryIcons[category] || <FaQuestionCircle />;
  return (
    <>
      <div className="max-w-[600px] flex mt-2.5 bg-gray-50 rounded-lg shadow-sm p-3">
        <div className="flex items-center space-x-4 w-full">
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
            <p className="text-sm font-semibold text-gray-800">
              Debited Amount
            </p>
            <p className="text-[17px] text-red-500 text-center">-{amount}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailsCard;
