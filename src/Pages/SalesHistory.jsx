import { Link } from "react-router";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { salesData } from "../data/salesByYear";

export default function SalesHistory() {
  const years = Object.keys(salesData).sort((a, b) => b - a); // latest year first

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/95 backdrop-blur-sm border border-emerald-700 rounded-lg p-4 shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.name}: <span className="text-white font-semibold">{entry.value.toLocaleString()}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" bg-emerald-950 pt-25 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sales <span className="text-emerald-300">History</span>
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Comprehensive historical sales data and performance metrics across all years
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {years.map((year) => (
          <div key={year} className="mb-12">
            {/* Year Header */}
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-6 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-300 text-center">
                {year} Performance Overview
              </h2>
            </div>

            {/* Chart Container */}
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-6 mb-6">
              <div className="h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={salesData[year]} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    barSize={40}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#064e3b" 
                      opacity={0.3} 
                    />
                    <XAxis 
                      dataKey="project" 
                      stroke="#a7f3d0"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      stroke="#a7f3d0"
                      fontSize={12}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{
                        paddingTop: "20px",
                        color: "#a7f3d0"
                      }}
                    />
                    <Bar 
                      dataKey="currentUsers" 
                      name="Current Users" 
                      fill="#60a5fa"  // Bright Blue
                      radius={[4, 4, 0, 0]}
                      className="hover:opacity-80 transition-opacity"
                    />
                    <Bar 
                      dataKey="buyers" 
                      name="Total Buyers" 
                      fill="#f59e0b"  // Amber/Orange
                      radius={[4, 4, 0, 0]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-6">
              <h3 className="text-xl font-bold text-emerald-300 mb-4 text-center">
                Detailed Data for {year}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-black/50 border border-emerald-700 rounded-xl">
                  <thead>
                    <tr className="bg-emerald-900/50 text-left">
                      <th className="px-4 py-3 border-b border-emerald-700 text-emerald-300 font-semibold">Project</th>
                      <th className="px-4 py-3 border-b border-emerald-700 text-emerald-300 font-semibold">Release Date</th>
                      <th className="px-4 py-3 border-b border-emerald-700 text-emerald-300 font-semibold">Current Users</th>
                      <th className="px-4 py-3 border-b border-emerald-700 text-emerald-300 font-semibold">Total Buyers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData[year].map((p, index) => (
                      <tr 
                        key={p.project} 
                        className={`hover:bg-emerald-900/30 transition-colors ${
                          index % 2 === 0 ? 'bg-black/20' : 'bg-black/40'
                        }`}
                      >
                        <td className="px-4 py-3 border-b border-emerald-800 text-white font-medium">{p.project}</td>
                        <td className="px-4 py-3 border-b border-emerald-800 text-emerald-200">{p.release}</td>
                        <td className="px-4 py-3 border-b border-emerald-800 text-blue-300 font-semibold">
                          {p.currentUsers.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 border-b border-emerald-800 text-amber-300 font-semibold">
                          {p.buyers.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Year Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-emerald-700">
                <div className="text-center p-4 bg-emerald-900/30 rounded-xl border border-emerald-700">
                  <div className="text-2xl font-bold text-emerald-300">
                    {salesData[year].reduce((sum, item) => sum + item.currentUsers, 0).toLocaleString()}
                  </div>
                  <div className="text-emerald-100 text-sm">Total Users</div>
                </div>
                <div className="text-center p-4 bg-emerald-900/30 rounded-xl border border-emerald-700">
                  <div className="text-2xl font-bold text-emerald-300">
                    {salesData[year].reduce((sum, item) => sum + item.buyers, 0).toLocaleString()}
                  </div>
                  <div className="text-emerald-100 text-sm">Total Buyers</div>
                </div>
                <div className="text-center p-4 bg-emerald-900/30 rounded-xl border border-emerald-700">
                  <div className="text-2xl font-bold text-emerald-300">
                    {salesData[year].length}
                  </div>
                  <div className="text-emerald-100 text-sm">Projects</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}