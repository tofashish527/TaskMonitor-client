import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAxios from "../../Hooks/useAxios";
import { FaUsers, FaChartBar, FaTasks, FaCrown, FaClipboardList, FaHeadset, FaSalesforce } from "react-icons/fa";

const TASKS = ["Paper-work", "Content", "Support", "Sales"];

const HRDashboard = () => {
  const axiosInstance = useAxios();
  const [works, setWorks] = useState([]);

  // Aggregated hours per task for display and chart
  const [hoursByTask, setHoursByTask] = useState({
    "Paper-work": 0,
    Content: 0,
    Support: 0,
    Sales: 0,
  });

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await axiosInstance.get("/worksheet");
        const data = res.data || [];

        setWorks(data);

        // Aggregate total hours per task
        const agg = {
          "Paper-work": 0,
          Content: 0,
          Support: 0,
          Sales: 0,
        };

        data.forEach((item) => {
          if (agg[item.task] !== undefined) {
            agg[item.task] += Number(item.hours) || 0;
          }
        });

        setHoursByTask(agg);
      } catch (err) {
        console.error("Failed to fetch worksheet data:", err);
      }
    };

    fetchWorks();
  }, [axiosInstance]);

  const totalHours = works.reduce((sum, item) => sum + (item.hours || 0), 0);

  // Prepare data array for recharts
  const chartData = TASKS.map((task) => ({
    task,
    hours: hoursByTask[task] || 0,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-purple-900/95 backdrop-blur-sm border border-purple-500 rounded-xl p-4 shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          <p className="text-white text-sm">
            Hours: <span className="text-white font-semibold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const taskIcons = {
    "Paper-work": <FaClipboardList className="text-2xl" />,
    "Content": <FaTasks className="text-2xl" />,
    "Support": <FaHeadset className="text-2xl" />,
    "Sales": <FaSalesforce className="text-2xl" />
  };

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-600 mb-6">
            <FaUsers className="text-white" />
            <span className="text-white font-semibold">Human Resources</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            HR <span className="text-white">Dashboard</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Comprehensive overview of workforce productivity and task distribution across departments.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Total Hours Summary */}
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-700/50 rounded-2xl flex items-center justify-center border border-purple-500/50">
                <FaChartBar className="text-3xl text-white" />
              </div>
              <div>
                <h3 className="text-white text-lg mb-1">Total Work Hours Tracked</h3>
                <p className="text-4xl font-bold text-white">{totalHours}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-sm">Across all departments</p>
              <p className="text-white text-sm">{works.length} individual entries</p>
            </div>
          </div>
        </div>

        {/* Task Hours Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TASKS.map((task) => (
            <div
              key={task}
              className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50 mb-4">
                  {taskIcons[task]}
                </div>
                <h3 className="text-white text-lg mb-2 text-center">{task}</h3>
                <p className="text-3xl font-bold text-white mb-1">
                  {hoursByTask[task]}
                </p>
                <span className="text-white text-sm">Total Hours</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-violet-600/10"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaChartBar className="text-white" />
              Work Hours by Task
            </h3>
            <div className="text-white text-sm bg-purple-700/50 px-3 py-1 rounded-full border border-purple-500/50">
              {works.length} entries tracked
            </div>
          </div>
          
          <div className="h-80 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barSize={40}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#7e22ce" 
                  opacity={0.3} 
                />
                <XAxis 
                  dataKey="task" 
                  stroke="#ffffff"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#ffffff"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{
                    color: '#ffffff',
                    paddingTop: '20px'
                  }}
                />
                <Bar 
                  dataKey="hours" 
                  name="Hours Worked" 
                  fill="#ffffff"
                  radius={[6, 6, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task Distribution */}
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
              <FaCrown className="text-white" />
              Task Distribution
            </h3>
            <div className="space-y-4 relative z-10">
              {TASKS.map((task) => (
                <div 
                  key={task}
                  className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30"
                >
                  <span className="text-white">{task}</span>
                  <div className="text-right">
                    <span className="text-white font-bold">{hoursByTask[task]}h</span>
                    <span className="text-white text-sm block">
                      {totalHours > 0 ? ((hoursByTask[task] / totalHours) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Insights */}
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
              <FaUsers className="text-white" />
              Department Insights
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Most Active Department</span>
                <span className="text-white font-bold bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1 rounded-full">
                  {TASKS.reduce((maxTask, task) => 
                    hoursByTask[task] > hoursByTask[maxTask] ? task : maxTask, TASKS[0]
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Average Hours per Task</span>
                <span className="text-white font-bold">
                  {(totalHours / TASKS.length).toFixed(1)}h
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Productivity Score</span>
                <span className="text-white font-bold bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1 rounded-full">
                  {totalHours > 0 ? Math.min(100, (totalHours / 100) * 10) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;