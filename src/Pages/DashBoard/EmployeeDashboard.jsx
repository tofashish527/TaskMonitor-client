import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { FaClock, FaDollarSign, FaTasks, FaChartBar, FaCrown, FaGem } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [works, setWorks] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    if (!user?.email) return;
    const fetchWorksheet = async () => {
      const res = await axiosInstance.get(`/worksheet/${user.email}`);
      const employeeData = res.data || [];
      setWorks(employeeData);
      const totalH = employeeData.reduce((acc, curr) => acc + parseFloat(curr.hours || 0), 0);
      setTotalHours(totalH);
      setCompletedTasks(employeeData.length);
    };
    fetchWorksheet();
  }, [axiosInstance, user]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchPayments = async () => {
      const res = await axiosInstance.get(`/payments/${user.email}`);
      const paymentData = res.data || [];
      const totalEarned = paymentData.reduce((acc, curr) => {
        const val = parseFloat(curr.salary || 0);
        return acc + val;
      }, 0);
      setTotalEarnings(totalEarned);
    };
    fetchPayments();
  }, [axiosInstance, user]);

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

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-600 mb-6">
            <FaCrown className="text-white" />
            <span className="text-white font-semibold">Employee Excellence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Employee <span className="text-white">Dashboard</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Welcome back, {user?.displayName || 'Valued Employee'}! Your performance shines bright.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50">
                <FaClock className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Total Hours</h3>
                <p className="text-3xl font-bold text-white">{totalHours.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50">
                <FaDollarSign className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Total Earnings</h3>
                <p className="text-3xl font-bold text-white">${totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50">
                <FaTasks className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Tasks Completed</h3>
                <p className="text-3xl font-bold text-white">{completedTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50">
                <FaGem className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Avg. Hours</h3>
                <p className="text-3xl font-bold text-white">
                  {completedTasks > 0 ? (totalHours / completedTasks).toFixed(1) : '0.0'}
                </p>
              </div>
            </div>
          </div>
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
              {works.length} tasks tracked
            </div>
          </div>
          
          {works.length > 0 ? (
            <div className="h-80 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={works} 
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
                    fontSize={20}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#ffffff"
                    fontSize={20}
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
          ) : (
            <div className="text-center py-12 relative z-10">
              <div className="text-6xl mb-4">💎</div>
              <h4 className="text-xl font-semibold text-white mb-2">No Data Available</h4>
              <p className="text-white">Start working on tasks to see your royal progress here.</p>
            </div>
          )}
        </div>

        {/* Recent Activity & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tasks */}
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
              <FaTasks className="text-white" />
              Recent Tasks
            </h3>
            <div className="space-y-3 relative z-10">
              {works.slice(0, 5).map((work, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-4 bg-purple-700/30 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                >
                  <div>
                    <p className="text-white font-medium">{work.task}</p>
                    <p className="text-white text-sm">{work.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{work.hours}h</p>
                  </div>
                </div>
              ))}
              {works.length === 0 && (
                <p className="text-white text-center py-4">No recent tasks</p>
              )}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
              <FaCrown className="text-white" />
              Performance Summary
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Productivity Rate</span>
                <span className="text-white font-bold bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1 rounded-full">
                  {completedTasks > 0 ? Math.min(100, (completedTasks / 10) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Hourly Rate</span>
                <span className="text-white font-bold">
                  ${totalHours > 0 ? (totalEarnings / totalHours).toFixed(2) : '0.00'}/hr
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Weekly Average</span>
                <span className="text-white font-bold">
                  {(totalHours / 4).toFixed(1)}h/week
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Efficiency Score</span>
                <span className="text-white font-bold bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1 rounded-full">
                  {completedTasks > 0 ? Math.min(100, (totalHours / completedTasks) * 10) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;