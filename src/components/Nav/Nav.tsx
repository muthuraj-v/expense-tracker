import React, { useEffect, useMemo, useRef, useState } from "react";
import userimag from "../../assets/user.png";
import { IoIosHome } from "react-icons/io";
import { RiFileList3Fill } from "react-icons/ri";

import { GiTakeMyMoney } from "react-icons/gi";
import { MdBarChart } from "react-icons/md";

import Burger from "./Burger";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { getUserInfo, logout } from "../../utils/ExpenseData";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/interface";

const Nav: React.FC = () => {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState<boolean>(false);
  const toggleHamburger = () => {
    setHamburgerIsOpen(!hamburgerIsOpen);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const Location = useLocation();
  const fetchData = async (): Promise<User> => {
    try {
      const user = await getUserInfo();
      console.log("User info:", user);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const { data: userData } = useQuery<User>({
    queryKey: ["user"],
    queryFn: fetchData,
    staleTime: Infinity,
  });

  const userAvatar = useMemo(() => {
    if (!userData?.avatar || userData.avatar.trim() === "") {
      return userimag;
    }
    return userData.avatar;
  }, [userData]);
  console.log(userAvatar);

  const isTrue: boolean =
    Location.pathname === "/transaction" ||
    Location.pathname === "/add_transaction";

  const navItems = [
    { id: 1, text: "Home", icon: <IoIosHome />, link: "/main" },

    {
      id: 2,
      text: "Transaction",
      icon: <RiFileList3Fill />,
      link: "/transaction",
    },
    { id: 3, text: "Reports", icon: <MdBarChart />, link: "/reports" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      setDropdownOpen(false);
      navigate("/login");
    } catch (err) {
      alert("Failed to logout");
    }
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-lvw h-[66px] flex   gap-9 items-center px-8 bg-white shadow-md border-b border-gray-100 z-10000  ">
        <div
          className="block sm:block md:block lg:hidden cursor-pointer ml-0.5"
          onClick={toggleHamburger}
        >
          <Burger isOpen={hamburgerIsOpen} />
        </div>
        <div className="hidden sm:hidden md:hidden lg:block  cursor-pointer">
          {/* <img src={Logo} alt="Logo" className="w-[49px] h-[45px]" /> */}
          <h2 className="flex items-center text-[22px] text-[#222] space-x-2 ">
            <FaWallet className="text-purple-600 text-3xl" />
            <span>Expense Tracker</span>
          </h2>
        </div>
        <div className="flex items-center text-[20px] text-black  lg:hidden">
          <span className=" text-[30px] font-bolder mr-[5px] text-[#333]  ">
            <GiTakeMyMoney />
          </span>
          Expense Tracker
        </div>
        <div
          className={`
    ${
      hamburgerIsOpen
        ? `
      flex flex-col justify-between items-center
      sm:flex md:flex
      absolute top-[60px] h-[calc(100vh-50px)] w-[100vw]
      bg-black/80 text-white z-[100]
      transition-all duration-[3000ms] delay-[3000ms] ease-in-out left-0
    `
        : "hidden sm:hidden md:hidden lg:block"
    }
    
  `}
        >
          <ul
            className={`${
              hamburgerIsOpen
                ? "flex flex-col  w-full p-0 space-y-4"
                : "hidden sm:hidden md:hidden lg:flex justify-between"
            }`}
          >
            {navItems.map((val) => (
              <li key={val.id} className="w-full">
                <NavLink
                  to={val.link}
                  className={`block ${
                    hamburgerIsOpen
                      ? "pt-5 pb-5 text-center w-full border-b border-[#ccc] text-white"
                      : "pr-[30px] list-none text-black flex items-center gap-0.5"
                  }`}
                >
                  <span className="text-[18px] hidden sm:hidden md:hidden lg:block">
                    {val.icon}
                  </span>
                  {val.text}
                </NavLink>
              </li>
            ))}

            <li>
              <NavLink
                to={"/profile"}
                className={`block ${
                  hamburgerIsOpen
                    ? "pt-5 pb-5 text-center w-full border-b border-[#ccc] text-white"
                    : "text-[18px] hidden sm:hidden md:hidden lg:hidden"
                }`}
              >
                <span className="text-[18px] hidden sm:hidden md:hidden lg:block">
                  {"ss"}
                </span>
                {"Profile"}
              </NavLink>
            </li>
            <li>
              <div
                onClick={handleLogout}
                className={`block ${
                  hamburgerIsOpen
                    ? "pt-5 pb-5 text-center w-full border-b border-[#ccc] text-white"
                    : "text-[18px] hidden sm:hidden md:hidden lg:hidden"
                }`}
              >
                <span className="text-[18px] hidden sm:hidden md:hidden lg:block">
                  {"ss"}
                </span>
                {"Logout"}
              </div>
            </li>
          </ul>
        </div>
        <div className="hidden sm:hidden md:hidden lg:flex items-center ml-auto space-x-4">
          {!isTrue && (
            <button
              className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm cursor-pointer rounded-xl shadow-md transition duration-200 ease-in-out"
              onClick={() => navigate("/add_transaction")}
            >
              Add Transaction
            </button>
          )}

          <div className="relative" ref={dropdownRef}>
            <div
              className="w-9 h-9 cursor-pointer bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={userAvatar}
                alt={userData?.userName}
                onError={(e) => (e.currentTarget.src = userimag)}
                className="rounded-full w-9 h-9 object-cover"
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;
