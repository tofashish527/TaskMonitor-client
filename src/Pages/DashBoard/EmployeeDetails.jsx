// EmployeeDetails.jsx
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useAxios from "../../Hooks/useAxios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [payroll, setPayroll] = useState([]);
  const axiosInstance = useAxios();
useEffect(() => {
  const fetchDetails = async () => {
    const empRes = await axiosInstance.get(`/user/${id}`);
    setEmployee(empRes.data);

    const payrollRes = await axiosInstance.get(`/payroll/${id}`);
    const payrollWithLabels = payrollRes.data.map(entry => ({
      ...entry,
      label: `${entry.month} ${entry.year}` // Add this
    }));
    setPayroll(payrollWithLabels);
  };
  fetchDetails();
}, [id]);


  if (!employee) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-6">
        <img
          src={employee.photoURL || "https://via.placeholder.com/100"}
          alt={employee.name}
          className="w-24 h-24 rounded-full border shadow"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee.name}</h2>
          <p className="text-gray-600">{employee.designation || "N/A"}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Salary History</h3>
        {payroll.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payroll}>
              <XAxis dataKey={(entry) => `${entry.month} ${entry.year}`} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="salary" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No payroll data found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
