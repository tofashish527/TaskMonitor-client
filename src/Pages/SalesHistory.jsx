import { Link } from "react-router";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { salesData } from "../data/salesByYear";

export default function SalesHistory() {
  const years = Object.keys(salesData).sort((a, b) => b - a); // latest year first

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📈 Sales History</h1>

        {years.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{year}</h2>

            <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData[year]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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

            {/* Optional: Show table with raw data */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-xl shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border">Project</th>
                    <th className="px-4 py-2 border">Release</th>
                    <th className="px-4 py-2 border">Current Users</th>
                    <th className="px-4 py-2 border">Buyers</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData[year].map((p) => (
                    <tr key={p.project} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{p.project}</td>
                      <td className="px-4 py-2 border">{p.release}</td>
                      <td className="px-4 py-2 border">{p.currentUsers}</td>
                      <td className="px-4 py-2 border">{p.buyers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
