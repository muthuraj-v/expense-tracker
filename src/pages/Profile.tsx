import React, { useMemo } from "react";
import History from "../components/History";
import Nav from "../components/Nav/Nav";
import { useQuery } from "@tanstack/react-query";
import { Saving, User } from "../types/interface";
import userPlaceholder from "../assets/user.png";
import { getUserInfo, getUserSavings } from "../utils/ExpenseData";
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
  const {
    data: userSavings,
    isLoading: savingsLoading,
    error: savingsError,
  } = useQuery<Saving[]>({
    queryKey: ["savings"],
    queryFn: () => getUserSavings(),
  });
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
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Savings</h3>

          {savingsLoading ? (
            <p className="text-gray-500">Loading savings...</p>
          ) : savingsError ? (
            <p className="text-red-500">Failed to load savings</p>
          ) : userSavings?.length === 0 ? (
            <p className="text-gray-600">No savings found.</p>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-lg font-semibold text-green-600">
                  Total Savings: ₹
                  {userSavings
                    ?.reduce((acc, item) => acc + Number(item.amount || 0), 0)
                    .toLocaleString()}
                </p>
              </div>

              <ul className="space-y-4">
                {userSavings?.slice(0, 4).map((saving) => (
                  <li
                    key={saving._id}
                    className="border border-gray-200 p-4 rounded-md shadow-sm bg-gray-50"
                  >
                    <p className="font-semibold text-gray-700">
                      ₹{Number(saving.amount).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {saving.category}
                    </p>
                    <p className="text-sm text-gray-500">Date: {saving.date}</p>
                    {saving.notes && (
                      <p className="text-sm text-gray-400">
                        Notes: {saving.notes}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
