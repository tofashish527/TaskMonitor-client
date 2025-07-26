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
      .get("/user")
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
      await axiosInstance.put(`/user/make-hr/${id}`);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === id ? { ...emp, role: "hr" } : emp
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Employees</h2>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {viewMode === "table" ? "Switch to Card View" : "Switch to Table View"}
        </button>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Designation</th>
                <th className="border px-4 py-2">Salary</th>
                <th className="border px-4 py-2">Fire</th>
                <th className="border px-4 py-2">Make HR</th>
                <th className="border px-4 py-2">Adjust Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp._id} className="hover:bg-gray-50 text-sm">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{emp.name}</td>
                  <td className="border px-4 py-2">{emp.email}</td>
                  <td className="border px-4 py-2">{emp.designation}</td>
                  <td className="border px-4 py-2">${emp.salary}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => !emp.fired && handleFire(emp._id, emp.name)}
                      className={`${
                        emp.fired
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white px-2 py-1 rounded`}
                      disabled={emp.fired}
                      title={emp.fired ? "Already Fired" : "Fire"}
                    >
                      {emp.fired ? "Fired" : "Fire"}
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {emp.fired ? (
                      <FaTimesCircle
                        className="text-red-600 mx-auto"
                        size={20}
                        title="Fired"
                      />
                    ) : emp.role === "employee" ? (
                      <button
                        onClick={() => handleMakeHR(emp._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Make HR
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold flex justify-center">
                        HR
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => !emp.fired && openSalaryModal(emp)}
                      className={`${
                        emp.fired
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-yellow-600 hover:text-yellow-800"
                      }`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="bg-white p-4 border shadow rounded-md flex flex-col gap-2"
            >
              <h3 className="font-semibold text-lg">{emp.name}</h3>
              <p className="text-gray-600">{emp.email}</p>
              <p className="text-sm">Designation: {emp.designation}</p>
              <p className="text-sm font-medium">Salary: ${emp.salary}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => !emp.fired && handleFire(emp._id, emp.name)}
                  className={`${
                    emp.fired
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white px-2 py-1 rounded text-xs`}
                  disabled={emp.fired}
                >
                  {emp.fired ? "Fired" : "Fire"}
                </button>
                {emp.fired ? (
                  <FaTimesCircle
                    className="text-red-600"
                    size={20}
                    title="Fired"
                  />
                ) : emp.role === "employee" ? (
                  <button
                    onClick={() => handleMakeHR(emp._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Make HR
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold text-xs">HR</span>
                )}
                <button
                  onClick={() => !emp.fired && openSalaryModal(emp)}
                  className={`${
                    emp.fired
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-yellow-600 hover:text-yellow-800"
                  } text-xs`}
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
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/80 rounded-lg p-6 w-80 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setSalaryModalOpen(false)}
            >
              <IoMdClose size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Adjust Salary</h3>
            <div className="text-sm mb-2">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
            </div>
            <input
              type="number"
              min={selectedUser.salary}
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Enter new salary"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSalaryModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={updateSalary}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;

