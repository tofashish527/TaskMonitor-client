import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../Hooks/useAxios';

const EmployeeDashboard = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth(); // get logged-in user
  const [works, setWorks] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Get total work hours from worksheet
  useEffect(() => {
    if (!user?.email) return;
    const fetchWorksheet = async () => {
      const res = await axiosInstance.get(`/worksheet/${user.email}`);
      const employeeData = res.data || [];

      setWorks(employeeData);
      const totalH = employeeData.reduce((acc, curr) => acc + parseFloat(curr.hours || 0), 0);
      setTotalHours(totalH);
    };

    fetchWorksheet();
  }, [axiosInstance, user]);

  // Get total collected money from payments
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h2 className="text-4xl font-bold text-indigo-700 mb-6">Employee Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-indigo-100">
          <h3 className="text-gray-600 text-lg mb-2">Total Work Hours</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalHours}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-indigo-100">
          <h3 className="text-gray-600 text-lg mb-2">Collected Money</h3>
          <p className="text-3xl font-bold text-green-600">${totalEarnings.toLocaleString()}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Work Hours by Task</h3>
        {works.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={works} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="task" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#6366f1" name="Hours Worked" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No worksheet data available.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
