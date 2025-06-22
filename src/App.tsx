import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Reports from "./pages/Reports";
import AddTransaction from "./pages/AddTransaction";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/add_transaction" element={<AddTransaction />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
//  let message;
//  message="Something";

// interface User{
//   name:String,
//   age:Number

// }
// const newUser:User={
// name: "john_doe",
//   age:3
// }
