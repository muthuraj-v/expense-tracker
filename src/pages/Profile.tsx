import React, { useMemo } from "react";
import History from "../components/History";
import Nav from "../components/Nav/Nav";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/interface";
import userPlaceholder from "../assets/user.png"; // update path as needed
import { getUserInfo } from "../utils/ExpenseData";
export const Profile: React.FC = () => {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUserInfo,
    staleTime: Infinity,
  });

  const avatar = useMemo(() => {
    if (!userData?.avatar || userData.avatar.trim() === "") {
      return userPlaceholder;
    }
    return userData.avatar;
  }, [userData]);

  const formattedDate = useMemo(() => {
    if (!userData?.createdAt) return "";
    return new Date(userData.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [userData]);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load profile.
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Nav />
      <div className="grow p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <History />
        <h2 className="font-bold text-3xl text-center text-gray-800 mb-8">
          Profile
        </h2>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={avatar}
            alt={userData?.userName}
            onError={(e) => (e.currentTarget.src = userPlaceholder)}
            className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
          />

          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-gray-800">
              {userData?.userName}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{userData?.email}</p>
            <p className="text-gray-500 text-xs mt-2">
              Joined on {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
