import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleAccessToken = tokenResponse.access_token;

        await axios.post(
          "http://localhost:2000/api/google-login",
          { access_token: googleAccessToken },
          { withCredentials: true }
        );

        const res = await axios.get("http://localhost:2000/api/user", {
          withCredentials: true,
        });
        console.log(res);

        setUser(res.data.user);
        // console.log(res.data.user);

        // alert("Login successful!");
        navigate("/");
      } catch (error) {
        console.error("Login or fetch failed:", error);
        alert("Login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Google Login failed:", error);
      alert("Google login failed!");
    },
  });

  return (
    <div className="h-dvh bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-8 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaWallet className="text-purple-600" />
          Expense Tracker
        </h1>
        <p className="text-center text-gray-600 text-sm">
          Manage your spending with ease and claritys.!
        </p>

        <button
          type="button"
          onClick={() => login()}
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium py-2 px-6 rounded-full shadow-md"
        >
          Connect & Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
