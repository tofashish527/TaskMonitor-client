import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { FaUsers, FaMoneyBillWave, FaCreditCard, FaCrown, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  const axiosInstance = useAxios();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total employees count
        const empRes = await axiosInstance.get("/employees/count");
        setTotalEmployees(empRes.data.count || 0);

        // Fetch all payroll records
        const paymentsRes = await axiosInstance.get("/payroll/requests");
        const payments = paymentsRes.data || [];

        // Filter only paid payrolls (with paymentDate)
        const paidPayments = payments.filter((item) => item.paymentDate);

        // Calculate total paid salary
        const sumSalary = paidPayments.reduce((acc, curr) => acc + (curr.salary || 0), 0);
        setTotalSalaryPaid(sumSalary);

        // Count only paid payrolls
        setTotalPayments(paidPayments.length);
      } catch (error) {
        console.error("Failed to fetch admin dashboard data", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-600 mb-6">
            <FaCrown className="text-white" />
            <span className="text-white font-semibold">Admin Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Admin <span className="text-white">Dashboard</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Comprehensive overview of your organization's workforce and financial operations.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50">
                <FaUsers className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Total Employees</h3>
                <p className="text-3xl font-bold text-white">{totalEmployees}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50">
                <FaMoneyBillWave className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Total Salary Paid</h3>
                <p className="text-3xl font-bold text-white">${totalSalaryPaid.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50">
                <FaCreditCard className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Total Payments</h3>
                <p className="text-3xl font-bold text-white">{totalPayments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Insights */}
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
              <FaChartLine className="text-white" />
              Quick Insights
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Avg. Salary per Employee</span>
                <span className="text-white font-bold">
                  ${totalEmployees > 0 ? (totalSalaryPaid / totalEmployees).toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Payment Success Rate</span>
                <span className="text-white font-bold bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1 rounded-full">
                  {totalPayments > 0 ? Math.min(100, (totalPayments / totalEmployees) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Monthly Average</span>
                <span className="text-white font-bold">
                  ${(totalSalaryPaid / 12).toLocaleString()}/month
                </span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
              <FaCrown className="text-white" />
              System Status
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Database</span>
                <span className="text-white font-bold bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 rounded-full">
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Payroll System</span>
                <span className="text-white font-bold bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <span className="text-white">Employee Portal</span>
                <span className="text-white font-bold bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 rounded-full">
                  Running
                </span>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default AdminDashboard;