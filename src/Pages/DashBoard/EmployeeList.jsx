import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";
import { FaUsers, FaEye, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

Modal.setAppElement("#root");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmployeeList = () => {
  const axiosInstance = useAxios();
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payMonth, setPayMonth] = useState("");
  const [payYear, setPayYear] = useState("");
  const [existingPayroll, setExistingPayroll] = useState([]);
  
  const {
    data: employees = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axiosInstance.get("/employees/hr");
      return res.data;
    },
  });

  const toggleVerified = async (id, currentStatus) => {
    try {
      await axiosInstance.put(`/user/toggle-verified/${id}`, {
        isVerified: !currentStatus,
      });
      Swal.fire(
        "Updated",
        `Employee is now ${!currentStatus ? "Verified" : "Unverified"}`,
        "success"
      );
      refetch();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || err.message, "error");
    }
  };

  const openPayModal = async (employee) => {
    setSelectedEmployee(employee);
    setPayMonth("");
    setPayYear("");
    setPayModalOpen(true);
    try {
      const res = await axiosInstance.get(`/payments?email=${encodeURIComponent(employee.email.toLowerCase())}`);
      setExistingPayroll(res.data);
    } catch (err) {
      console.error("Failed to fetch payroll", err);
      setExistingPayroll([]);
    }
  };

  const handlePaymentRequest = async () => {
    if (!payMonth || !payYear) {
      return Swal.fire("Error", "Please enter both month and year", "warning");
    }

    const alreadyPaid = existingPayroll.find((entry) => {
      const entryMonth = entry.month || entry.salaryMonth;
      const entryYear = entry.year || entry.salaryYear;
      return (
        String(entryMonth).toLowerCase() === payMonth.toLowerCase() &&
        String(entryYear) === String(payYear)
      );
    });

    if (alreadyPaid) {
      return Swal.fire(
        "Warning",
        "Salary already paid for this month & year!",
        "warning"
      );
    }

    try {
      await axiosInstance.post("/payroll/request", {
        userId: selectedEmployee._id,
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        salary: selectedEmployee.salary,
        month: payMonth,
        year: Number(payYear),
      });

      setPayModalOpen(false);
      Swal.fire("Success", "Payment request sent to Payroll.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send payment request.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-600 mb-6">
            <FaUsers className="text-white" />
            <span className="text-white font-semibold">Human Resources</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Employee <span className="text-white">Management</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Manage employee verification, payments, and profile details
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Employee List Card */}
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-violet-600/10"></div>
          
          {/* Stats Header */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaUsers className="text-white" />
                Employee Directory
              </h3>
              <p className="text-purple-200 mt-1">
                {employees.length} employees in system
              </p>
            </div>
            <div className="text-right">
              <div className="text-white text-sm bg-purple-700/50 px-3 py-1 rounded-full border border-purple-500/50">
                HR Access
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 relative z-10">
              <div className="text-white text-xl">Loading employees...</div>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-700/50 border-b border-purple-600/50">
                      <th className="px-4 py-3 text-left text-white font-semibold">#</th>
                      <th className="px-4 py-3 text-left text-white font-semibold">Employee</th>
                      <th className="px-4 py-3 text-left text-white font-semibold">Contact</th>
                      <th className="px-4 py-3 text-left text-white font-semibold">Bank Details</th>
                      <th className="px-4 py-3 text-left text-white font-semibold">Salary</th>
                      <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-white font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp, index) => (
                      <tr key={emp._id} className="border-b border-purple-600/30 hover:bg-purple-700/20 transition-colors duration-200">
                        <td className="px-4 py-3 text-white font-medium">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-white font-semibold">{emp.name}</div>
                            <div className="text-purple-200 text-sm">{emp.designation || "Employee"}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-purple-200">{emp.email}</td>
                        <td className="px-4 py-3">
                          <div className="text-white">
                            {emp.bank_account_no || "Not provided"}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FaDollarSign className="text-green-400" />
                            <span className="text-white font-semibold">{emp.salary}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleVerified(emp._id, emp.isVerified)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 ${
                              emp.isVerified 
                                ? "bg-green-500/20 text-green-300 border border-green-400/30 hover:bg-green-500/30" 
                                : "bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30"
                            }`}
                          >
                            {emp.isVerified ? (
                              <>
                                <FaCheckCircle />
                                Verified
                              </>
                            ) : (
                              <>
                                <FaTimesCircle />
                                Unverified
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Link
                              to={`/dashboard/employee-details/${emp.email.toLowerCase()}`}
                              className="flex items-center gap-2 px-3 py-2 bg-purple-600/50 hover:bg-purple-500/50 text-white rounded-lg transition-all duration-300 hover:scale-105 border border-purple-500/30"
                            >
                              <FaEye className="text-sm" />
                              View
                            </Link>
                            <button
                              onClick={() => emp.isVerified && openPayModal(emp)}
                              disabled={!emp.isVerified}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 border ${
                                emp.isVerified
                                  ? "bg-green-600/50 hover:bg-green-500/50 text-white border-green-500/30"
                                  : "bg-gray-600/50 text-gray-400 border-gray-500/30 cursor-not-allowed"
                              }`}
                            >
                              <FaMoneyBillWave className="text-sm" />
                              Pay
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {employees.length === 0 && (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center">
                          <div className="text-purple-200 text-lg">No employees found in the system.</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={payModalOpen}
        onRequestClose={() => setPayModalOpen(false)}
        className="max-w-md mx-auto mt-20 bg-purple-800/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl relative"
        overlayClassName="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-start z-50"
      >
        <button
          onClick={() => setPayModalOpen(false)}
          className="absolute top-4 right-4 text-purple-200 hover:text-white text-2xl font-bold leading-none transition-colors duration-200"
        >
          &times;
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-700/50 rounded-2xl flex items-center justify-center border border-purple-500/50 mx-auto mb-4">
            <FaMoneyBillWave className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Process Payment
          </h2>
          <p className="text-purple-200">
            For {selectedEmployee?.name}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-500/30">
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Salary Amount</span>
              <span className="text-white font-bold text-lg">${selectedEmployee?.salary}</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white font-medium mb-2">
              <FaCalendarAlt className="text-purple-300" />
              Payment Month
            </label>
            <select
              value={payMonth}
              onChange={(e) => setPayMonth(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="" className="text-purple-900">Select month</option>
              {MONTHS.map((month) => (
                <option key={month} value={month} className="text-purple-900">
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white font-medium mb-2">
              <FaCalendarAlt className="text-purple-300" />
              Payment Year
            </label>
            <input
              type="number"
              value={payYear}
              onChange={(e) => setPayYear(e.target.value)}
              placeholder={new Date().getFullYear().toString()}
              className="w-full px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setPayModalOpen(false)}
            className="px-6 py-3 bg-purple-600/50 hover:bg-purple-500/50 text-white rounded-xl transition-all duration-300 hover:scale-105 border border-purple-500/30"
          >
            Cancel
          </button>
          <button
            onClick={handlePaymentRequest}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Process Payment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeList;