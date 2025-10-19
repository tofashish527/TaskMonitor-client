import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";

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
    <div className="max-w-6xl mx-auto pt-25 space-y-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Total Employees</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalEmployees}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Total Salary Paid</h2>
          <p className="text-3xl font-bold text-green-600">${totalSalaryPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
          <p className="text-3xl font-bold text-purple-600">{totalPayments}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
