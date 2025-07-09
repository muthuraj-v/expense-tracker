import { Expense, Saving, User, UserApiResponse } from "../types/interface";

import axios from "axios";
export async function fetchData(): Promise<Expense[]> {
  const response = await fetch(import.meta.env.VITE_API_URL + "/expense/data", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const json = await response.json();

  return json;
}
export const getUserInfo = async (): Promise<User> => {
  const response = await axios.get<UserApiResponse>(
    import.meta.env.VITE_API_URL + "/user",
    {
      withCredentials: true,
    }
  );
  return response.data.user;
};

export const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
export const getUserSavings = async (): Promise<Saving[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/save/data`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return [];
    }

    return (await response.json()) || [];
  } catch (error) {
    console.error("Fetch savings error:", error);
    throw error;
  }
};
// const navigate = useNavigate();
