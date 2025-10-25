import { useEffect, useState } from "react";
import { FaEdit, FaTimesCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

const AllEmployeeList = () => {
  const axiosInstance = useAxios();
  const [employees, setEmployees] = useState([]);
  const [salaryModalOpen, setSalaryModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newSalary, setNewSalary] = useState("");
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    axiosInstance
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleFire = async (id, name) => {
    const result = await Swal.fire({
      title: `Fire ${name}?`,
      text: "Are you sure you want to fire this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, fire",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.put(`/user/fire/${id}`);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === id ? { ...emp, fired: true } : emp
        )
      );
      Swal.fire("Fired!", "Employee has been fired.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to fire employee",err.message);
    }
  };

  const handleMakeHR = async (id) => {
    try {
      await axiosInstance.put(`/user/promote/${id}`);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === id ? { ...emp, role: "HR" } : emp
        )
      );
      Swal.fire("Success", "User promoted to HR", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to promote to HR", err.message);
    }
  };

  const openSalaryModal = (user) => {
    setSelectedUser(user);
    setNewSalary(user.salary);
    setSalaryModalOpen(true);
  };

  const updateSalary = async () => {
    if (Number(newSalary) < Number(selectedUser.salary || 0)) {
      return Swal.fire("Error!", "Salary cannot be decreased.", "warning");
    }

    try {
      await axiosInstance.put(`/user/salary/${selectedUser._id}`, {
        salary: newSalary,
      });
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === selectedUser._id ? { ...emp, salary: newSalary } : emp
        )
      );
      setSalaryModalOpen(false);
      Swal.fire("Updated!", "Salary updated successfully.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update salary",err.message);
    }
  };

  return (
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">All Employees</h2>
              <p className="text-purple-200">Manage your team members and their roles</p>
            </div>
            <button
              onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 border border-purple-500"
            >
              {viewMode === "table" ? "Switch to Card View" : "Switch to Table View"}
            </button>
          </div>

          {viewMode === "table" ? (
            /* Table View */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-700/50 border-b border-purple-600/50">
                    <th className="p-4 text-left text-white font-semibold">#</th>
                    <th className="p-4 text-left text-white font-semibold">Name</th>
                    <th className="p-4 text-left text-white font-semibold">Email</th>
                    <th className="p-4 text-left text-white font-semibold">Designation</th>
                    <th className="p-4 text-left text-white font-semibold">Salary</th>
                    <th className="p-4 text-left text-white font-semibold">Fire</th>
                    <th className="p-4 text-left text-white font-semibold">Make HR</th>
                    <th className="p-4 text-left text-white font-semibold">Adjust Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={emp._id} className="border-b border-purple-600/30 hover:bg-purple-700/20 transition-colors duration-200">
                      <td className="p-4 text-white font-medium">{index + 1}</td>
                      <td className="p-4 text-white">{emp.name}</td>
                      <td className="p-4 text-purple-200">{emp.email}</td>
                      <td className="p-4 text-white">{emp.designation}</td>
                      <td className="p-4 text-purple-300 font-semibold">${emp.salary}</td>
                      <td className="p-4">
                        <button
                          onClick={() => !emp.fired && handleFire(emp._id, emp.name)}
                          className={`${
                            emp.fired
                              ? "bg-gray-600/50 cursor-not-allowed text-gray-400"
                              : "bg-red-600/80 hover:bg-red-700 text-white"
                          } px-4 py-2 rounded-lg transition-colors duration-200 border border-red-500`}
                          disabled={emp.fired}
                          title={emp.fired ? "Already Fired" : "Fire"}
                        >
                          {emp.fired ? "Fired" : "Fire"}
                        </button>
                      </td>
                      <td className="p-4">
                        {emp.fired ? (
                          <FaTimesCircle
                            className="text-red-400 mx-auto"
                            size={20}
                            title="Fired"
                          />
                        ) : emp.role === "Employee" ? (
                          <button
                            onClick={() => handleMakeHR(emp._id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-purple-500"
                          >
                            Make HR
                          </button>
                        ) : (
                          <span className="text-green-400 font-semibold flex justify-center">
                            HR
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => !emp.fired && openSalaryModal(emp)}
                          className={`${
                            emp.fired
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-yellow-400 hover:text-yellow-300"
                          } transition-colors duration-200`}
                          disabled={emp.fired}
                          title={
                            emp.fired
                              ? "Cannot adjust salary of a fired employee"
                              : "Adjust Salary"
                          }
                        >
                          <FaEdit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Card View */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {employees.map((emp) => (
                <div
                  key={emp._id}
                  className="bg-purple-700/30 border border-purple-600/50 rounded-xl p-4 backdrop-blur-sm hover:bg-purple-700/40 transition-all duration-300"
                >
                  <h3 className="font-semibold text-lg text-white mb-2">{emp.name}</h3>
                  <p className="text-purple-200 text-sm mb-2">{emp.email}</p>
                  <p className="text-white text-sm mb-2">Designation: {emp.designation}</p>
                  <p className="text-purple-300 font-semibold mb-4">Salary: ${emp.salary}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => !emp.fired && handleFire(emp._id, emp.name)}
                      className={`${
                        emp.fired
                          ? "bg-gray-600/50 cursor-not-allowed text-gray-400"
                          : "bg-red-600/80 hover:bg-red-700 text-white"
                      } px-3 py-2 rounded-lg text-sm transition-colors duration-200 border border-red-500 flex-1`}
                      disabled={emp.fired}
                    >
                      {emp.fired ? "Fired" : "Fire"}
                    </button>
                    {emp.fired ? (
                      <FaTimesCircle
                        className="text-red-400"
                        size={20}
                        title="Fired"
                      />
                    ) : emp.role === "Employee" ? (
                      <button
                        onClick={() => handleMakeHR(emp._id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-200 border border-purple-500 flex-1"
                      >
                        Make HR
                      </button>
                    ) : (
                      <span className="text-green-400 font-semibold text-sm flex items-center justify-center flex-1">HR</span>
                    )}
                    <button
                      onClick={() => !emp.fired && openSalaryModal(emp)}
                      className={`${
                        emp.fired
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-yellow-400 hover:text-yellow-300"
                      } p-2 transition-colors duration-200`}
                      disabled={emp.fired}
                      title={
                        emp.fired
                          ? "Cannot adjust salary of a fired employee"
                          : "Adjust Salary"
                      }
                    >
                      <FaEdit size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Salary Modal */}
          {salaryModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
              <div className="bg-purple-800/90 border border-purple-600 rounded-2xl p-6 w-full max-w-md shadow-2xl backdrop-blur-sm">
                <button
                  className="absolute top-4 right-4 text-purple-200 hover:text-white transition-colors duration-200"
                  onClick={() => setSalaryModalOpen(false)}
                >
                  <IoMdClose size={24} />
                </button>
                <h3 className="text-xl font-bold text-white mb-4">Adjust Salary</h3>
                <div className="text-purple-200 text-sm mb-4">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                </div>
                <input
                  type="number"
                  min={selectedUser.salary}
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                  placeholder="Enter new salary"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSalaryModalOpen(false)}
                    className="px-4 py-2 bg-purple-600/50 hover:bg-purple-600 text-white rounded-xl transition-colors duration-200 border border-purple-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateSalary}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200 border border-green-500"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEmployeeList;