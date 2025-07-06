import { Expense, User, UserApiResponse } from "../types/interface";
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
    "http://localhost:2000/api/user",
    {
      withCredentials: true,
    }
  );
  return response.data.user; // this is a User
};
