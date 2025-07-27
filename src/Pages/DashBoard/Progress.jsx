
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
    axiosInstance.get("/employees").then((res) => {
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Progress</h2>

      {/* 🟩 Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border px-3 py-2 rounded"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp.email}>
              {emp.name || emp.email}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {[...Array(12).keys()].map(m => (
            <option key={m + 1} value={m + 1}>
              {new Date(0, m).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {validYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* 🟩 Total Hours */}
      <div className="mb-4 text-lg font-semibold">
        Total Work Hours: <span className="text-blue-600">{totalHours}</span>
      </div>

      {/* 🟩 Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Task</th>
              <th className="p-2 border">Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorksheets.map((entry) => (
              <tr key={entry._id}>
                <td className="p-2 border">{entry.name || entry.email || "N/A"}</td>
                <td className="p-2 border">
                  {entry.date ? new Date(entry.date).toLocaleDateString() : "Invalid Date"}
                </td>
                <td className="p-2 border">{entry.task || "No Task"}</td>
                <td className="p-2 border">{entry.hours || 0}</td>
              </tr>
            ))}
            {filteredWorksheets.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
