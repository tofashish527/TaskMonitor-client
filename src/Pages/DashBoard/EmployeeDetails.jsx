// EmployeeDetails.jsx
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useAxios from "../../Hooks/useAxios";
//import useAuth from "../../hooks/useAuth";

const EmployeeDetails = () => {
  const { email } = useParams();
  //const {user}=useAuth();
  const [employee, setEmployee] = useState(null);
  const [payroll, setPayroll] = useState([]);
  const axiosInstance = useAxios();

// useEffect(() => {
//   const fetchDetails = async () => {
//     const empRes = await axiosInstance.get(`/user/email/${user.email}`);
//     setEmployee(empRes.data);

//     const paychart = await axiosInstance.get(`/payments/${user.email}`);
//     const paychartWithLabels = paychart.data.map(entry => ({
//       ...entry,
//       label: `${entry.salaryMonth} ${entry.salaryYear}` // Add this
//     }));
//     setPayroll(paychartWithLabels);
//   };
//   fetchDetails();
// }, [id]);

useEffect(() => {
    const fetchDetails = async () => {
      try {
        const empRes = await axiosInstance.get(`/user/email/${email}`); // 👈 FIXED
        setEmployee(empRes.data);

        const paychart = await axiosInstance.get(`/payments/${email}`); // 👈 FIXED
        const paychartWithLabels = paychart.data.map(entry => ({
          ...entry,
          label: `${entry.salaryMonth} ${entry.salaryYear}`
        }));
        setPayroll(paychartWithLabels);
      } catch (err) {
        console.error("Error fetching employee details", err);
      }
    };
    fetchDetails();
  }, [email]); 

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
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={payroll}>
//               <XAxis dataKey="label" label={{ value: 'Month, Year', position: 'insideBottom', offset: -5 }} />
//   <YAxis label={{ value: 'Salary', angle: -90, position: 'insideLeft' }} />
//               <Tooltip />
//               <Bar dataKey="salary" fill="#4f46e5" />
//             </BarChart>
//           </ResponsiveContainer>
<ResponsiveContainer width="100%" height={300}>
  <BarChart
    data={payroll}
    margin={{ top: 20, right: 30, left: 20, bottom: 50 }} // more spacing
    barCategoryGap={80} // increase gap between bars
    barSize={60} // widen each bar
  >
    <XAxis
      dataKey="label"
      label={{
        value: 'Month, Year',
        position: 'insideBottom',
        offset: -40,
        style: { textAnchor: "middle", fontSize: 14 }
      }}
      angle={-25} // slanted labels for clarity
      textAnchor="end"
      interval={0}
    />
    <YAxis
      label={{
        value: 'Salary Amount',
        angle: -90,
        position: 'insideLeft',
        style: { textAnchor: "middle", fontSize: 14 }
      }}
    />
    <Tooltip />
    <Bar dataKey="salary" fill="#4f46e5" radius={[4, 4, 0, 0]} />
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
