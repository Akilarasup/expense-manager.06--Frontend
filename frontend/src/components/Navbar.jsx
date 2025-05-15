import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">Expense Manager</h1>
      <div className="space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">Dashboard</Link>
        <Link to="/add-expense" className="text-blue-600 hover:underline">Add Expense</Link>
      </div>
    </nav>
  );
}
