import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router";

const Payroll = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(null);

  const { data: requests = [] } = useQuery({
    queryKey: ["payrollRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/payroll/requests");
      return res.data;
    },
  });

  const handlePay = (req) => {
    setUpdating(req._id);
    try {
      navigate(`/dashboard/payment/${req.userId}`, {
        state: {
          userId: req.userId,
          name: req.name,
          email: req.email,
          salary: req.salary,
          month: req.month,
          year: req.year,
          payrollId: req._id, // pass payroll ID for updating payment date later
        },
      });
    } catch (error) {
      console.error("Navigation error:", error);
      Swal.fire("Error", "Failed to navigate to payment page", "error");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">Payroll Requests</h2>
            <p className="text-purple-200">Manage employee salary payments</p>
          </div>

          {requests.length === 0 ? (
            <div className="text-center p-8 text-purple-200">
              <p className="text-lg">No pending payroll requests.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-700/50 border-b border-purple-600/50">
                    <th className="p-4 text-left text-white font-semibold">Name</th>
                    <th className="p-4 text-left text-white font-semibold">Salary</th>
                    <th className="p-4 text-left text-white font-semibold">Month</th>
                    <th className="p-4 text-left text-white font-semibold">Year</th>
                    <th className="p-4 text-left text-white font-semibold">Payment Date</th>
                    <th className="p-4 text-left text-white font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id} className="border-b border-purple-600/30 hover:bg-purple-700/20 transition-colors duration-200">
                      <td className="p-4 text-white">{req.name}</td>
                      <td className="p-4 text-purple-300 font-semibold">${req.salary}</td>
                      <td className="p-4 text-white">{req.month}</td>
                      <td className="p-4 text-white">{req.year}</td>
                      <td className="p-4 text-purple-200">
                        {req.paymentDate
                          ? new Date(req.paymentDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="p-4">
                        <button
                          className={`px-4 py-2 rounded-lg transition-colors duration-200 border ${
                            req.paymentDate
                              ? "bg-green-600/50 text-green-300 border-green-500 cursor-not-allowed"
                              : updating === req._id
                              ? "bg-purple-600/50 text-purple-300 border-purple-500 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700 text-white border-green-500"
                          }`}
                          onClick={() => handlePay(req)}
                          disabled={!!req.paymentDate || updating === req._id}
                        >
                          {req.paymentDate
                            ? "Paid"
                            : updating === req._id
                            ? "Paying..."
                            : "Pay"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payroll;