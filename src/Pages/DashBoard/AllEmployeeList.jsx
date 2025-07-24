import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AllEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [salaryModalOpen, setSalaryModalOpen] = useState(false);
  const [newSalary, setNewSalary] = useState("");
  const axiosInstance = useAxios();

  // Fetch employees + HRs
  useEffect(() => {
    axiosInstance
      .get("/user")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, [axiosInstance]);

  // Fire user with SweetAlert confirmation
  const handleFire = async (id, name) => {
    const result = await Swal.fire({
      title: `Fire ${name}?`,
      text: "Are you sure you want to fire this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, fire!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.put(`/user/fire/${id}`);
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === id ? { ...emp, fired: true } : emp))
      );
      Swal.fire("Fired!", `${name} has been fired.`, "success");
    } catch (err) {
      console.error("Failed to fire user", err);
      Swal.fire("Error!", "Failed to fire user.", "error");
    }
  };

  // Promote employee to HR
  const handleMakeHR = async (id) => {
    try {
      await axiosInstance.put(`/user/promote/${id}`);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === id ? { ...emp, role: "hr" } : emp
        )
      );
    } catch (err) {
      console.error("Promotion failed", err);
      Swal.fire("Error!", "Failed to promote user.", "error");
    }
  };

  // Open salary modal
  const openSalaryModal = (user) => {
    setSelectedUser(user);
    setNewSalary(user.salary || "");
    setSalaryModalOpen(true);
  };

  // Update salary
  const updateSalary = async () => {
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
      console.error("Salary update failed", err);
      Swal.fire("Error!", "Failed to update salary.", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Verified Employees</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Designation</th>
              <th className="px-4 py-2 border">Salary</th>
              <th className="px-4 py-2 border">Make HR</th>
              <th className="px-4 py-2 border">Fire</th>
              <th className="px-4 py-2 border">Adjust Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const role = emp.role?.toLowerCase();

              return (
                <tr key={emp._id} className="text-center">
                  <td className="border px-4 py-2">{emp.name}</td>
                  <td className="border px-4 py-2">{emp.email}</td>
                  <td className="border px-4 py-2">{emp.designation}</td>
                  <td className="border px-4 py-2">{emp.salary || "-"}</td>

                  {/* Make HR Column */}
                  <td className="border px-4 py-2 text-center">
                    {emp.fired ? (
                      <FaTimesCircle
                        className="text-red-600 mx-auto"
                        size={24}
                        title="Fired"
                      />
                    ) : role === "employee" ? (
                      <button
                        onClick={() => handleMakeHR(emp._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                        title="Promote to HR"
                      >
                        Make HR
                      </button>
                    ) : role === "hr" ? (
                      <span className="flex items-center justify-center gap-1 text-green-600 font-semibold">
                        HR 
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Fire Column */}
                  <td className="border px-4 py-2">
                    {emp.fired ? (
                      <span className="text-red-500 font-semibold">Fired</span>
                    ) : (
                      <button
                        onClick={() => handleFire(emp._id, emp.name)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Fire
                      </button>
                    )}
                  </td>

                  {/* Adjust Salary Column */}
                  <td className="border px-4 py-2 text-center">
                    {!emp.fired ? (
                      <button
                        onClick={() => openSalaryModal(emp)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Adjust
                      </button>
                    ) : (
                      <FaTimesCircle
                        className="text-red-600 mx-auto"
                        size={24}
                        title="Fired"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Salary Modal */}
      {/* {salaryModalOpen && (
        // <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-20">
        //   <div className="bg-white p-6 rounded-md w-96">
        //     <h3 className="text-lg font-semibold mb-4">Adjust Salary</h3>
        //     <input
        //       type="number"
        //       value={newSalary}
        //       onChange={(e) => setNewSalary(e.target.value)}
        //       className="w-full border px-3 py-2 mb-4"
        //       placeholder="Enter new salary"
        //     />
        //     <div className="flex justify-end gap-2">
        //       <button
        //         onClick={() => setSalaryModalOpen(false)}
        //         className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        //       >
        //         Cancel
        //       </button>
        //       <button
        //         onClick={updateSalary}
        //         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        //       >
        //         Update
        //       </button>
        //     </div>
        //   </div>
        // </div>
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-20">
  <div className="bg-lime-200 bg-opacity-60 backdrop-blur-md rounded-md p-5 w-64 shadow-md border border-white/30">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">Adjust Salary</h3>
    
    <div className="mb-3">
      <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
      <p className="text-gray-900 truncate">{selectedUser?.name}</p>
    </div>

    <div className="mb-3">
      <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
      <p className="text-gray-900 truncate">{selectedUser?.email}</p>
    </div>

    <div className="mb-5">
      <label htmlFor="salary" className="block text-gray-600 text-sm font-medium mb-1">Salary</label>
      <input
        id="salary"
        type="number"
        value={newSalary}
        onChange={(e) => setNewSalary(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        placeholder="Enter new salary"
        autoFocus
      />
    </div>

    <div className="flex justify-between gap-3">
      <button
        onClick={() => setSalaryModalOpen(false)}
        className="flex-grow bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-4 py-2 transition"
      >
        Cancel
      </button>
      <button
        onClick={updateSalary}
        className="flex-grow bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 transition"
      >
        Update
      </button>
    </div>
  </div>
</div>


      )} */}
      {salaryModalOpen && (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-20">
    <div className="relative bg-white bg-opacity-60 backdrop-blur-md rounded-md p-5 w-64 shadow-md border border-white/30">
      
      {/* Close button */}
      <button
        onClick={() => setSalaryModalOpen(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
        aria-label="Close modal"
      >
        <FaTimes />
      </button>

      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">Adjust Salary</h3>
      
      <div className="mb-3">
        <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
        <p className="text-gray-900 truncate">{selectedUser?.name}</p>
      </div>

      <div className="mb-3">
        <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
        <p className="text-gray-900 truncate">{selectedUser?.email}</p>
      </div>

      <div className="mb-5">
        <label htmlFor="salary" className="block text-gray-600 text-sm font-medium mb-1">Salary</label>
        <input
          id="salary"
          type="number"
          value={newSalary}
          onChange={(e) => setNewSalary(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="Enter new salary"
          autoFocus
        />
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={() => setSalaryModalOpen(false)}
          className="flex-grow bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-4 py-2 transition"
        >
          Cancel
        </button>
        <button
          onClick={updateSalary}
          className="flex-grow bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 transition"
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
