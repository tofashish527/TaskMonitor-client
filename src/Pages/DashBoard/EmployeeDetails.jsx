import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../Hooks/useAxios";

const getIntroOfMonthYear = (label) => {
  const descriptions = {
    
  };
  return descriptions[label] || "";
};

const CustomTooltip = ({ active, payload, label }) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="custom-tooltip bg-white p-2 rounded shadow"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <p className="label font-semibold">{`${label} : $${payload[0].value}`}</p>
          <p className="intro text-sm text-gray-600">{getIntroOfMonthYear(label)}</p>
          <p className="desc text-xs text-gray-500">Salary payment details</p>
        </>
      )}
    </div>
  );
};

const EmployeeDetails = () => {
  const { email } = useParams();
  const [employee, setEmployee] = useState(null);
  const [payroll, setPayroll] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const empRes = await axiosInstance.get(`/user/email/${email}`);
        setEmployee(empRes.data);

        const payRes = await axiosInstance.get(`/payments/${email}`);

        // Format label like "Aug'2025"
        const payWithLabels = payRes.data.map((entry) => {
          const month = new Date(`${entry.salaryYear}-${entry.salaryMonth}-01`).toLocaleString("en-US", {
            month: "short",
          });
          const year = entry.salaryYear;
          return {
            ...entry,
            label: `${month}'${year}`,
            salary: Number(entry.salary),
          };
        });

        setPayroll(payWithLabels);
      } catch (err) {
        console.error("Error fetching employee details", err);
      }
    };
    fetchDetails();
  }, [email, axiosInstance]);

  if (!employee) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-6">
        <img
          src={employee.photoURL}
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

<ResponsiveContainer width={600} height={400}>
  <BarChart
    data={payroll}
    margin={{ top: 5, right: 30, left: 120, bottom: 100 }}
    barCategoryGap={100}
    barSize={50}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="label"
      angle={-15}
      textAnchor="end"
      interval={0}
      label={{
        value: "Month, Year",
        position: "insideBottom",
        offset: -50,
        style: { textAnchor: "middle", fontSize: 24 },
      }}
    />
    <YAxis
      label={{
        value: "Salary Amount ($)",
        angle: -90,
        position: "insideLeft",
        offset: -30,
        style: { textAnchor: "middle", fontSize: 24 },
      }}
    />
    <Tooltip content={CustomTooltip} />
    {/* Removed <Legend /> here */}
    <Bar dataKey="salary" fill="#8884d8" radius={[4, 4, 0, 0]} />
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
