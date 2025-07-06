import React from "react";
import { FaHome } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { MdBarChart, MdOutlineAddCard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { ImProfile } from "react-icons/im";
const History: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="m-3 pb-3 flex items-center text-sm font-medium text-gray-600 border-b border-gray-300">
      <div className="flex items-center space-x-2">
        <FaHome className="text-gray-500" />
        {pathname === "/" ? (
          <span className="text-gray-500">Home</span>
        ) : (
          <NavLink
            to="/main"
            className="text-blue-600 hover:text-blue-300 cursor-pointer"
          >
            Home
          </NavLink>
        )}

        {pathname.startsWith("/transaction") && (
          <>
            <span>/</span>
            <RiFileList3Fill className="text-gray-500" />
            {pathname === "/transaction" ? (
              <span className="text-gray-500">Transaction</span>
            ) : (
              <NavLink
                to="/transaction"
                className="text-blue-600 hover:text-blue-300 cursor-pointer"
              >
                Transaction
              </NavLink>
            )}
          </>
        )}

        {pathname === "/add_transaction" && (
          <>
            <span>/</span>
            <NavLink
              to="/transaction"
              className="text-blue-600 hover:text-blue-300 cursor-pointer"
            >
              Transaction
            </NavLink>
            <span>/</span>

            <MdOutlineAddCard className="text-gray-500" />
            <span className="text-gray-500">Add Transaction</span>
          </>
        )}

        {pathname === "/reports" && (
          <>
            <span>/</span>
            <MdBarChart className="text-gray-500" />
            <span className="text-gray-500">Reports</span>
          </>
        )}
        {pathname === "/profile" && (
          <>
            <span>/</span>
            <ImProfile className="text-gray-500" />
            <span className="text-gray-500">Profile</span>
          </>
        )}
      </div>
    </nav>
  );
};

export default History;
