import { Link } from "react-router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { salesData } from "../data/salesByYear";

export default function SalesOverview() {
  const currentYear = new Date().getFullYear();
  const currentYearSales = salesData[currentYear] || [];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            📊 {currentYear} Sales Overview
          </h2>
          <Link to="/sales-history" className="text-blue-600 hover:text-blue-800 font-medium">
            Explore More →
          </Link>
        </div>

        {currentYearSales.length ? (
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentYearSales} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="project" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="currentUsers" fill="#4F46E5" name="Current Users" />
                <Bar dataKey="buyers" fill="#F59E0B" name="Buyers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500">No sales data available for this year.</p>
        )}
      </div>
    </section>
  );
}
