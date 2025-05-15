import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const addExpense = (expenseData) => 
  axios.post(`${API_BASE}/expenses`, expenseData);

// ✅ FIXED: now returns only the data array, not the full response object
export const getExpenses = async () => {
  const response = await axios.get(`${API_BASE}/expenses`);
  return response.data;
};
