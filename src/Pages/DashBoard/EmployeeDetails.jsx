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
      className="custom-tooltip bg-purple-800 border border-purple-600 p-3 rounded-xl shadow-lg text-white"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <p className="label font-semibold">{`${label} : $${payload[0].value}`}</p>
          <p className="intro text-sm text-purple-200">{getIntroOfMonthYear(label)}</p>
          <p className="desc text-xs text-purple-300">Salary payment details</p>
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

  if (!employee) return (
    <div className="min-h-screen bg-purple-300 py-8 px-4 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Employee Details</h2>
            
            {/* Employee Info Card */}
            <div className="bg-purple-700/30 border border-purple-600/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-6">
                <img
                  src={employee.photoURL}
                  alt={employee.name}
                  className="w-24 h-24 rounded-full border-2 border-purple-500 shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
                  <p className="text-purple-200 text-lg">{employee.designation || "N/A"}</p>
                  <p className="text-purple-300">{employee.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Salary History Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Salary History</h3>
            {payroll.length > 0 ? (
              <div className="bg-purple-700/30 border border-purple-600/50 rounded-xl p-6 backdrop-blur-sm">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={payroll}
                    margin={{ top: 5, right: 30, left: 120, bottom: 100 }}
                    barCategoryGap={100}
                    barSize={50}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.3} />
                    <XAxis
                      dataKey="label"
                      angle={-15}
                      textAnchor="end"
                      interval={0}
                      stroke="#E9D5FF"
                      fontSize={12}
                      label={{
                        value: "Month, Year",
                        position: "insideBottom",
                        offset: -50,
                        style: { textAnchor: "middle", fontSize: 14, fill: '#E9D5FF' },
                      }}
                    />
                    <YAxis
                      stroke="#E9D5FF"
                      fontSize={12}
                      label={{
                        value: "Salary Amount ($)",
                        angle: -90,
                        position: "insideLeft",
                        offset: -30,
                        style: { textAnchor: "middle", fontSize: 14, fill: '#E9D5FF' },
                      }}
                    />
                    <Tooltip content={CustomTooltip} />
                    {/* Removed <Legend /> here */}
                    <Bar 
                      dataKey="salary" 
                      fill="#A855F7" 
                      radius={[4, 4, 0, 0]}
                      stroke="#7C3AED"
                      strokeWidth={1}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="bg-purple-700/30 border border-purple-600/50 rounded-xl p-8 text-center">
                <p className="text-purple-200 text-lg">No payroll data found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;