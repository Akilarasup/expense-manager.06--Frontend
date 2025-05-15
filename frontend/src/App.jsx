// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Expense Manager
            </Link>
            <div className="space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/add" className="text-gray-700 hover:text-blue-600">
                Add Expense
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddExpense />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
