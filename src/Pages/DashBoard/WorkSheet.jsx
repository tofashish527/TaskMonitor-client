import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const WorkSheet = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    task: "Sales",
    hours: "",
    date: new Date(),
  });

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/worksheet?email=${user.email}`)
      .then((res) => setTasks(res.data))
      .catch(() => toast.error("Failed to fetch worksheet data"));
  }, [user, axiosInstance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.hours || !user?.email) return toast.error("Please complete the form");

    const newTask = {
      ...form,
      email: user.email,
      hours: Number(form.hours),
    };

    try {
      const res = await axiosInstance.post("/worksheet", newTask);
      const insertedId = res.data.insertedId;
      setTasks((prev) => [{ ...newTask, _id: insertedId }, ...prev]);
      setForm({ task: "Sales", hours: "", date: new Date() });
      toast.success("Task added");
    } catch {
      toast.error("Error adding task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/worksheet/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditing({ ...task, date: new Date(task.date) });
  };

  const handleUpdate = async () => {
    try {
      const updated = {
        ...editing,
        hours: Number(editing.hours),
        email: user.email,
      };
      await axiosInstance.put(`/worksheet/${editing._id}`, updated);
      setTasks((prev) =>
        prev.map((t) => (t._id === editing._id ? { ...updated, _id: editing._id } : t))
      );
      toast.success("Task updated");
      setEditing(null);
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Work Sheet</h2>

      {/* 📌 Inline form */}
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 mb-6">
        <select
          name="task"
          value={form.task}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option>Sales</option>
          <option>Support</option>
          <option>Content</option>
          <option>Paper-work</option>
        </select>

        <input
          name="hours"
          type="number"
          value={form.hours}
          onChange={handleChange}
          placeholder="Hours Worked"
          className="input input-bordered"
          min={0}
        />

        <DatePicker
          selected={form.date}
          onChange={(date) => setForm((prev) => ({ ...prev, date }))}
          className="input input-bordered"
          dateFormat="yyyy-MM-dd"
        />

        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      {/* 📌 Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t.task}</td>
                <td>{t.hours}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(t)} className="text-blue-500"><FaEdit /></button>
                  <button onClick={() => handleDelete(t._id)} className="text-red-500"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📌 Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">Edit Task</h3>

            <select
              name="task"
              value={editing.task}
              onChange={(e) => setEditing((prev) => ({ ...prev, task: e.target.value }))}
              className="select select-bordered w-full mb-2"
            >
              <option>Sales</option>
              <option>Support</option>
              <option>Content</option>
              <option>Paper-work</option>
            </select>

            <input
              type="number"
              value={editing.hours}
              onChange={(e) => setEditing((prev) => ({ ...prev, hours: e.target.value }))}
              className="input input-bordered w-full mb-2"
              min={0}
            />

            <DatePicker
              selected={editing.date}
              onChange={(date) => setEditing((prev) => ({ ...prev, date }))}
              className="input input-bordered w-full mb-2"
              dateFormat="yyyy-MM-dd"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="btn btn-outline">Cancel</button>
              <button onClick={handleUpdate} className="btn btn-success">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSheet;

