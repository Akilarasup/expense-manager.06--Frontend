import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { getExpenses } from "../services/api"; // ✅ Import centralized API

const filterOptions = ["Weekly", "Monthly", "Yearly"];

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("Monthly");

  useEffect(() => {
    fetchExpenses();
  }, [filter]);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses(filter); // ✅ Use centralized API
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const groupBy = (key) => {
    return expenses.reduce((result, item) => {
      const value = item[key];
      result[value] = (result[value] || 0) + parseFloat(item.amount);
      return result;
    }, {});
  };

  const renderPieChart = () => {
    const data = groupBy("type");
    return (
      <Pie
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              label: "Expenses by Type",
              data: Object.values(data),
              backgroundColor: [
                "#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#14b8a6"
              ],
            },
          ],
        }}
      />
    );
  };

  const renderBarChart = () => {
    const data = groupBy("mode");
    return (
      <Bar
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              label: "Expenses by Mode",
              data: Object.values(data),
              backgroundColor: "#60a5fa",
            },
          ],
        }}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Expense Dashboard</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          {filterOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Mode</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="border-t">
                <td className="p-3">{exp.type}</td>
                <td className="p-3">{new Date(exp.date).toLocaleDateString()}</td>
                <td className="p-3">{exp.mode}</td>
                <td className="p-3 font-semibold">₹{exp.amount}</td>
                <td className="p-3">{exp.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">{renderPieChart()}</div>
        <div className="bg-white p-4 rounded shadow">{renderBarChart()}</div>
      </div>
    </div>
  );
}
