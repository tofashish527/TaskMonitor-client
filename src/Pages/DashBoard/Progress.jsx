import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";

const Progress = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredWorksheets, setFilteredWorksheets] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const axiosInstance = useAxios();

  // Load employee list on mount
  useEffect(() => {
    axiosInstance.get("/employeesP").then((res) => {
      setEmployees(res.data || []);
    });
  }, []);

  // Load worksheets when employee changes
  useEffect(() => {
    const fetchWorksheets = async () => {
      let res;
      if (selectedEmployee) {
        res = await axiosInstance.get(`/worksheet/${selectedEmployee}`);
      } else {
        res = await axiosInstance.get("/worksheet");
        console.log(res);
      }

      const valid = (res.data || []).filter(w => {
        const d = new Date(w.date);
        return w.date && !isNaN(d.getTime());
      });

      setWorksheets(valid);
    };

    fetchWorksheets();
  }, [selectedEmployee]);

  // Apply filters
  useEffect(() => {
    let filtered = worksheets;

    if (selectedMonth) {
      filtered = filtered.filter(w => {
        const month = new Date(w.date).getUTCMonth() + 1;
        return month === parseInt(selectedMonth);
      });
    }

    if (selectedYear) {
      filtered = filtered.filter(w => {
        const year = new Date(w.date).getUTCFullYear();
        return year === parseInt(selectedYear);
      });
    }

    setFilteredWorksheets(filtered);
  }, [worksheets, selectedMonth, selectedYear]);

  const totalHours = filteredWorksheets.reduce(
    (sum, item) => sum + (Number(item.hours) || 0),
    0
  );

  const validYears = Array.from(
    new Set(worksheets.map(w => new Date(w.date).getUTCFullYear()))
  ).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">Employee Progress</h2>

          {/* Filters - Same functionality, updated styling */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              className="px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="" className="text-purple-900">All Employees</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp.email} className="text-purple-900">
                  {emp.name || emp.email}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="" className="text-purple-900">All Months</option>
              {[...Array(12).keys()].map(m => (
                <option key={m + 1} value={m + 1} className="text-purple-900">
                  {new Date(0, m).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="" className="text-purple-900">All Years</option>
              {validYears.map(year => (
                <option key={year} value={year} className="text-purple-900">
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Total Hours - Same functionality, updated styling */}
          <div className="mb-6 text-lg font-semibold text-white">
            Total Work Hours: <span className="text-purple-300">{totalHours}</span>
          </div>

          {/* Table - Same functionality, updated styling */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-700/50 border-b border-purple-600/50">
                  <th className="p-3 text-left text-white font-semibold">Employee</th>
                  <th className="p-3 text-left text-white font-semibold">Date</th>
                  <th className="p-3 text-left text-white font-semibold">Task</th>
                  <th className="p-3 text-left text-white font-semibold">Hours</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorksheets.map((entry) => (
                  <tr key={entry._id} className="border-b border-purple-600/30 hover:bg-purple-700/20 transition-colors duration-200">
                    <td className="p-3 text-white">{entry.name || entry.email || "N/A"}</td>
                    <td className="p-3 text-purple-200">
                      {entry.date ? new Date(entry.date).toLocaleDateString() : "Invalid Date"}
                    </td>
                    <td className="p-3 text-white">{entry.task || "No Task"}</td>
                    <td className="p-3 text-white">{entry.hours || 0}</td>
                  </tr>
                ))}
                {filteredWorksheets.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-purple-200">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;