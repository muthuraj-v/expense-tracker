# 💰 Expense Tracker

A full-stack Expense Tracker web application built with **React + TypeScript** and **Node.js + MongoDB**, allowing users to securely track their **income**, **expenses**, and **savings**. Authentication is handled via **Google OAuth**, and the application includes dedicated pages for managing finances and viewing reports.

---

## 🚀 Features

- 🔐 Secure authentication with Google OAuth
- ➕ Add, edit, and delete transactions (income, expense, saving)
- 📊 View detailed reports and charts
- 👤 Protected user profile page
- 🌐 REST API with Express and MongoDB
- 💾 Persistent data storage using MongoDB
- 🧠 Clean code architecture using React + TypeScript

---

## 🧰 Tech Stack

### Frontend

- React
- TypeScript
- React Router DOM
- Axios
- CSS Modules / Plain CSS

### Backend

- Node.js
- Express
- MongoDB (via Mongoose)
- Google OAuth 2.0
- dotenv for environment configuration

---

## 🗂️ Folder Structure (Frontend)

- client/
- ├── public/
- │   └── profile.png               # Default profile image
- ├── src/
- │   ├── App.tsx                   # App entry and routing
- │   ├── App.css                   # Global styles
- │   ├── pages/
- │   │   ├── Home.tsx              # Dashboard
- │   │   ├── Transaction.tsx       # View all transactions
- │   │   ├── AddTransaction.tsx    # Add income, expense, or saving
- │   │   ├── Reports.tsx           # Visual analytics and reports
- │   │   ├── LoginPage.tsx         # Google login
- │   │   └── Profile.tsx           # User profile
- │   └── utils/
- │       └── ProtectedRoute.tsx    # Wrapper for authenticated routes



---

## 🔐 Authentication

This project uses **Google OAuth** for secure user login.

- Only authenticated users can access `/main`, `/transaction`, `/reports`, `/profile`, etc.
- The frontend uses a `ProtectedRoute` wrapper to guard routes.
- OAuth token is securely verified and stored.

---

## 📦 Backend Overview

The backend is built using Node.js and Express. It provides RESTful endpoints to handle:

- User authentication and session
- CRUD operations for transactions (income, expense, saving)
- Reporting and aggregation logic

### Backend Features

- MongoDB with Mongoose
- JWT (or session-based) authentication
- Google OAuth integration
- Environment-based configuration with `.env`

---

## 📌 App Routes

| Path               | Component/Page       | Description                        |
|--------------------|----------------------|------------------------------------|
| `/`                | `LoginPage`          | Google OAuth login                 |
| `/main`            | `Home`               | Dashboard/home after login         |
| `/transaction`     | `Transaction`        | View all transactions              |
| `/add_transaction` | `AddTransaction`     | Form to add a new transaction      |
| `/reports`         | `Reports`            | Analytics and charts               |
| `/profile`         | `Profile`            | User profile information           |
| `*`                | Redirects to `/`     | Catch-all route                    |


## 1. Clone the repository
git clone https://github.com/muthuraj-v/expense-tracker.git

## 2. Navigate to the project directory
cd expense-tracker

## 3. Install dependencies
npm install

## 4. Start the React app
npm run dev


### To-Do / Future Enhancements
 - Export reports as PDF/CSV

 - Recurring transactions

 - add pages for income and saving wiht curd fucntions

 - Dark mode toggle



