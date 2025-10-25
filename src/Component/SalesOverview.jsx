import { Link } from "react-router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { salesData } from "../data/salesByYear";

export default function SalesOverview() {
  const currentYear = new Date().getFullYear();
  const currentYearSales = salesData[currentYear] || [];

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-emerald-900/95 backdrop-blur-sm border border-emerald-700 rounded-lg p-4 shadow-2xl">
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
    <section className="py-16  bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sales <span className="text-emerald-300">Overview</span>
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-6">
            Comprehensive analysis of current year sales performance and user growth metrics
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
        </div>

        {currentYearSales.length ? (
          <div className="bg-black backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-6 lg:p-8">
            {/* Chart Header */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentYear} Performance Metrics
                </h3>
                <p className="text-emerald-200">
                  Current Users vs Buyers across all projects
                </p>
              </div>
              <Link 
                to="/sales-history" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Explore Full History
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Chart Container */}
            <div className="h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={currentYearSales} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barSize={40}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#0f766e" 
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
  fill="#06b6d4"  // Bright Cyan
  radius={[4, 4, 0, 0]}
  className="hover:opacity-80 transition-opacity"
/>
<Bar 
  dataKey="buyers" 
  name="Total Buyers" 
  fill="#f97316"  // Vibrant Coral/Orange
  radius={[4, 4, 0, 0]}
  className="hover:opacity-80 transition-opacity" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-emerald-700/50">
              <div className="text-center p-4 bg-emerald-700/30 rounded-xl border border-emerald-600/30">
                <div className="text-2xl font-bold text-emerald-300">
                  {currentYearSales.reduce((sum, item) => sum + item.currentUsers, 0).toLocaleString()}
                </div>
                <div className="text-emerald-100 text-sm">Total Users</div>
              </div>
              <div className="text-center p-4 bg-emerald-700/30 rounded-xl border border-emerald-600/30">
                <div className="text-2xl font-bold text-emerald-300">
                  {currentYearSales.reduce((sum, item) => sum + item.buyers, 0).toLocaleString()}
                </div>
                <div className="text-emerald-100 text-sm">Total Buyers</div>
              </div>
              <div className="text-center p-4 bg-emerald-700/30 rounded-xl border border-emerald-600/30">
                <div className="text-2xl font-bold text-emerald-300">
                  {currentYearSales.length}
                </div>
                <div className="text-emerald-100 text-sm">Active Projects</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center bg-emerald-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Data Available</h3>
            <p className="text-emerald-200 mb-6">No sales data available for the current year.</p>
            <Link 
              to="/sales-history" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Check Historical Data
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}