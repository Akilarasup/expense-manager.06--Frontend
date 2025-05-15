import React, { useState } from "react";
import { addExpense } from "../services/api";  // ✅ import the API function

const initialState = {
  type: "",
  date: "",
  mode: "",
  amount: "",
  notes: ""
};

export default function AddExpense() {
  const [expense, setExpense] = useState(initialState);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense(expense);  // ✅ use the centralized API
      setMessage("Expense added successfully!");
      setExpense(initialState);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add expense.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Expense Type</label>
          <select
            name="type"
            value={expense.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Shopping</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Mode of Expense</label>
          <select
            name="mode"
            value={expense.mode}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Mode</option>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            name="notes"
            value={expense.notes}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted!", expense);
  // rest of your code...
}

