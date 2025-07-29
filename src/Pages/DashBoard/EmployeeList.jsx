
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import useAxios from "../../Hooks/useAxios";
import { Link} from "react-router";

Modal.setAppElement("#root");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmployeeList = () => {
    
//const navigate = useNavigate();
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
      // Fetch payroll/payment history for this employee by email (lowercase)
      const res = await axiosInstance.get(`/payments?email=${encodeURIComponent(employee.email.toLowerCase())}`);
      setExistingPayroll(res.data); // List of payrolls for this employee
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
    <div className="overflow-x-auto shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Employee List (HR)</h2>

      {isLoading ? (
        <p>Loading employees...</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Bank</th>
              <th>Salary</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.bank_account_no || "N/A"}</td>
                <td>${emp.salary}</td>
                <td>
                  <button
                    className={`text-xl ${emp.isVerified ? "text-green-600" : "text-red-600"}`}
                    onClick={() => toggleVerified(emp._id, emp.isVerified)}
                  >
                    {emp.isVerified ? "✅" : "❌"}
                  </button>
                </td>
                <td className="space-x-1">
                  <Link
                    to={`/dashboard/employee-details/${emp.email.toLowerCase()}`}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => emp.isVerified && openPayModal(emp)}
                    className="btn btn-xs btn-success"
                    disabled={!emp.isVerified}
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Payment Modal */}
      <Modal
  isOpen={payModalOpen}
  onRequestClose={() => setPayModalOpen(false)}
  className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-lg relative"
  overlayClassName="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-start z-50"
>
  <button
    onClick={() => setPayModalOpen(false)}
    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold leading-none"
  >
    &times;
  </button>
  <h2 className="text-xl font-semibold mb-4">
    Payment for {selectedEmployee?.name}
  </h2>
  <p className="mb-2">
    <strong>Salary:</strong> ${selectedEmployee?.salary}
  </p>
  <div className="mb-4">
    <label className="block mb-1 font-medium" htmlFor="payMonth">
      Month
    </label>
    <select
      id="payMonth"
      value={payMonth}
      onChange={(e) => setPayMonth(e.target.value)}
      className="w-full border px-3 py-2 rounded"
    >
      <option value="">Select month</option>
      {MONTHS.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-4">
    <label className="block mb-1 font-medium" htmlFor="payYear">
      Year
    </label>
    <input
      id="payYear"
      type="number"
      value={payYear}
      onChange={(e) => setPayYear(e.target.value)}
      placeholder={new Date().getFullYear()}
      className="w-full border px-3 py-2 rounded"
    />
  </div>
  <div className="flex justify-end gap-4">
    <button
      onClick={() => setPayModalOpen(false)}
      className="btn btn-outline"
    >
      Cancel
    </button>
    <button
      onClick={handlePaymentRequest}
      className="btn btn-success text-white"
    >
      Submit
    </button>
  </div>
</Modal>

    </div>
  );
};

export default EmployeeList;
