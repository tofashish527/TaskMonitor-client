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

  const totalHours = works.reduce((sum, item) => sum + item.hours, 0);


  // Prepare data array for recharts
  const chartData = TASKS.map((task) => ({
    task,
    hours: hoursByTask[task] || 0,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <h2 className="text-4xl font-bold text-indigo-700 mb-6">HR Dashboard</h2>
        <p className="font-bold text-xl">Total Hours: {totalHours}</p>

      {/* Total hours per task */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TASKS.map((task) => (
          <div
            key={task}
            className="bg-white shadow-lg rounded-2xl p-6 border border-indigo-100 flex flex-col items-center"
          >
            <h3 className="text-gray-600 text-lg mb-2">{task}</h3>
            <p className="text-4xl font-bold text-indigo-600">
              {hoursByTask[task]}
            </p>
            <span className="text-sm text-gray-400">Total Hours</span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Work Hours by Task
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="task" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hours" fill="#6366f1" name="Hours Worked" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HRDashboard;
