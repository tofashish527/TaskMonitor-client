import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import useAxios from "../../Hooks/useAxios";
import { Link, useNavigate } from "react-router";

Modal.setAppElement("#root");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmployeeList = () => {
    
const navigate = useNavigate();
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
      const res = await axiosInstance.get("/user");
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

  const openPayModal = async(employee) => {
    setSelectedEmployee(employee);
    setPayMonth("");
    setPayYear("");
    setPayModalOpen(true);

    
  try {
    const res = await axiosInstance.get(`/payroll/${employee._id}`);
    setExistingPayroll(res.data); // List of payrolls for this employee
  } catch (err) {
    console.error("Failed to fetch payroll", err);
    setExistingPayroll([]);
  }
  };


const handlePaymentRequest = (id) => {
  if (!payMonth || !payYear) {
    return Swal.fire("Error", "Please enter both month and year", "warning");
  }

  const alreadyPaid = existingPayroll.find(
    (entry) => entry.month === payMonth && entry.year === Number(payYear)
  );

  if (alreadyPaid) {
    return Swal.fire("Warning", "Salary already paid for this month & year", "warning");
  }

  // Close modal and navigate to payment gateway
  setPayModalOpen(false);

  navigate(`/dashboard/payment/${id}`, {
    state: {
      userId: selectedEmployee._id,
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      salary: selectedEmployee.salary,
      month: payMonth,
      year: Number(payYear),
    },
  });
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
                    to={`/dashboard/employee-details/${emp._id}`}
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
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
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


// import React, { useEffect, useState, useMemo } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import Swal from "sweetalert2";
// import Modal from "react-modal";
// import useAxios from "../../Hooks/useAxios";

// Modal.setAppElement("#root"); // accessibility

// const MONTHS = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const EmployeeList = () => {
//   const axiosInstance = useAxios();

//   // Data states
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Global filter state
//   const [globalFilter, setGlobalFilter] = useState("");

//   // Pay Modal states
//   const [payModalOpen, setPayModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [payMonth, setPayMonth] = useState("");
//   const [payYear, setPayYear] = useState("");

//   // Fetch employees from backend
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       setLoading(true);
//       try {
//         const { data } = await axiosInstance.get("/user");
//         setEmployees(data);
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error", "Failed to load employees", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployees();
//   }, [axiosInstance]);

//   // Toggle verified status
//   const toggleVerified = async (id, currentStatus) => {
//     try {
//       await axiosInstance.put(`/user/toggle-verified/${id}`, {
//         isVerified: !currentStatus,
//       });
//       setEmployees((prev) =>
//         prev.map((emp) =>
//           emp._id === id ? { ...emp, isVerified: !currentStatus } : emp
//         )
//       );
//       Swal.fire(
//         "Updated",
//         `Employee is now ${!currentStatus ? "Verified" : "Unverified"}`,
//         "success"
//       );
//     } catch (err) {
//       Swal.fire(
//         "Error",
//         `Failed to update verification status: ${err.response?.data?.error || err.message}`,
//         "error"
//       );
//     }
//   };

//   // Open Pay Modal
//   const openPayModal = (employee) => {
//     setSelectedEmployee(employee);
//     setPayMonth("");
//     setPayYear("");
//     setPayModalOpen(true);
//   };

//   // Submit payment request
//   const handlePaymentRequest = async () => {
//     if (!payMonth || !payYear) {
//       return Swal.fire("Error", "Please enter both month and year", "warning");
//     }
//     if (isNaN(payYear) || payYear < 2000 || payYear > new Date().getFullYear() + 10) {
//       return Swal.fire("Error", "Please enter a valid year", "warning");
//     }

//     try {
//       await axiosInstance.post("/payroll/request-payment", {
//         userId: selectedEmployee._id,
//         salary: selectedEmployee.salary,
//         month: payMonth,
//         year: Number(payYear),
//       });
//       setPayModalOpen(false);
//       Swal.fire("Success", "Payment request sent", "success");
//     } catch (err) {
//       Swal.fire(
//         "Error",
//         `Failed to send payment request: ${err.response?.data?.error || err.message}`,
//         "error"
//       );
//     }
//   };

//   // Define columns for TanStack Table v8
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "name",
//         header: "Name",
//       },
//       {
//         accessorKey: "email",
//         header: "Email",
//       },
//       {
//         id: "verified",
//         header: "Verified",
//         cell: ({ row }) => {
//           const emp = row.original;
//           const verified = !!emp.isVerified;
//           return (
//             <button
//               className={`text-xl ${verified ? "text-green-600" : "text-red-600"}`}
//               onClick={() => toggleVerified(emp._id, verified)}
//               title={verified ? "Click to mark unverified" : "Click to verify"}
//             >
//               {verified ? "✅" : "❌"}
//             </button>
//           );
//         },
//       },
//       {
//         accessorKey: "bank_account_no",
//         header: "Bank Account",
//         cell: (info) => info.getValue() || "N/A",
//       },
//       {
//         accessorKey: "salary",
//         header: "Salary",
//         cell: (info) => `$${info.getValue()}`,
//       },
//       {
//         id: "pay",
//         header: "Pay",
//         cell: ({ row }) => {
//           const emp = row.original;
//           const verified = !!emp.isVerified;
//           return (
//             <button
//               className={`px-3 py-1 rounded text-white ${
//                 verified
//                   ? "bg-green-600 hover:bg-green-700"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//               disabled={!verified}
//               onClick={() => verified && openPayModal(emp)}
//               title={verified ? "Pay this employee" : "Employee not verified"}
//             >
//               Pay
//             </button>
//           );
//         },
//       },
//       {
//         id: "details",
//         header: "Details",
//         cell: ({ row }) => {
//           const emp = row.original;
//           return (
//             <a
//               href={`/dashboard/employee-details/${emp._id}`}
//               className="text-blue-600 hover:underline"
//               rel="noopener noreferrer"
//             >
//               View
//             </a>
//           );
//         },
//       },
//     ],
//     []
//   );

//   // Setup TanStack Table instance
//   const table = useReactTable({
//     data: employees,
//     columns,
//     state: {
//       globalFilter,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Employee List (HR)</h1>

//       {/* Global Filter / Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={globalFilter ?? ""}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           placeholder="Search employees..."
//           className="w-full max-w-sm px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
//         />
//       </div>

//       <div className="overflow-x-auto border rounded">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-100">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     colSpan={header.colSpan}
//                     className="border px-4 py-2 text-left cursor-pointer select-none"
//                     onClick={header.column.getToggleSortingHandler()}
//                     title={
//                       header.column.getIsSorted()
//                         ? header.column.getIsSorted() === "asc"
//                           ? "Sorted ascending"
//                           : "Sorted descending"
//                         : "Click to sort"
//                     }
//                   >
//                     <div className="flex items-center gap-1">
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                       {{
//                         asc: " 🔼",
//                         desc: " 🔽",
//                       }[header.column.getIsSorted()] ?? null}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.length === 0 ? (
//               <tr>
//                 <td colSpan={columns.length} className="text-center p-4">
//                   No employees found.
//                 </td>
//               </tr>
//             ) : (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className="hover:bg-gray-50 transition"
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td
//                       key={cell.id}
//                       className="border px-4 py-2 align-middle"
//                     >
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between gap-2 mt-4 flex-wrap">
//         <div>
//           <button
//             className="px-3 py-1 border rounded disabled:opacity-50"
//             onClick={() => table.setPageIndex(0)}
//             disabled={!table.getCanPreviousPage()}
//             title="First Page"
//           >
//             {"<<"}
//           </button>
//           <button
//             className="px-3 py-1 border rounded disabled:opacity-50"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             title="Previous Page"
//           >
//             {"<"}
//           </button>
//           <button
//             className="px-3 py-1 border rounded disabled:opacity-50"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             title="Next Page"
//           >
//             {">"}
//           </button>
//           <button
//             className="px-3 py-1 border rounded disabled:opacity-50"
//             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//             title="Last Page"
//           >
//             {">>"}
//           </button>
//         </div>
//         <span className="whitespace-nowrap">
//           Page{" "}
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//           </strong>{" "}
//         </span>
//         <select
//           className="border rounded px-2 py-1"
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//         >
//           {[5, 10, 20, 50].map((size) => (
//             <option key={size} value={size}>
//               Show {size}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Payment Modal */}
//       <Modal
//         isOpen={payModalOpen}
//         onRequestClose={() => setPayModalOpen(false)}
//         contentLabel="Pay Employee"
//         className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-lg relative"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
//       >
//         <button
//           onClick={() => setPayModalOpen(false)}
//           className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold leading-none"
//           aria-label="Close payment modal"
//         >
//           &times;
//         </button>
//         <h2 className="text-xl font-semibold mb-4">
//           Payment for {selectedEmployee?.name}
//         </h2>
//         <p className="mb-2">
//           <strong>Salary:</strong> ${selectedEmployee?.salary}
//         </p>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium" htmlFor="payMonth">
//             Month
//           </label>
//           <select
//             id="payMonth"
//             value={payMonth}
//             onChange={(e) => setPayMonth(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="">Select month</option>
//             {MONTHS.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium" htmlFor="payYear">
//             Year
//           </label>
//           <input
//             id="payYear"
//             type="number"
//             value={payYear}
//             onChange={(e) => setPayYear(e.target.value)}
//             placeholder={new Date().getFullYear()}
//             min="2000"
//             max={new Date().getFullYear() + 10}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={() => setPayModalOpen(false)}
//             className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePaymentRequest}
//             className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
//           >
//             Submit Payment Request
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default EmployeeList;
