import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router";

const Payroll = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(null);

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["payrollRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/payroll/requests");
      return res.data;
    },
  });

  const handlePay = async (req) => {
    try {
      setUpdating(req._id);

      // Execute payment by calling backend
      const res = await axiosInstance.put(`/payroll/pay/${req._id}`);
      if (res.data.success) {
        // Navigate to payment page with correct employee info
        navigate(`/dashboard/payment/${req.userId}`, {
          state: {
            userId: req.userId,
            name: req.name,
            email: req.email,
            salary: req.salary,
            month: req.month,
            year: req.year,
          },
        });
        refetch();
      } else {
        throw new Error("Payment failed");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Payment failed", "error");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payroll Requests</h2>
      {requests.length === 0 ? (
        <p>No pending payroll requests.</p>
      ) : (
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Salary</th>
              <th>Month</th>
              <th>Year</th>
              <th>Payment Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.name}</td>
                <td>${req.salary}</td>
                <td>{req.month}</td>
                <td>{req.year}</td>
                <td>
                  {req.paymentDate
                    ? new Date(req.paymentDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
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
      )}
    </div>
  );
};

export default Payroll;
