import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaTrash, FaPlus, FaTasks } from "react-icons/fa";
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
      .get(`/worksheet/${user.email}`)
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
      name: user.displayName, 
      email: user.email,
      hours: Number(form.hours),
      date: form.date instanceof Date ? form.date.toISOString() : new Date(form.date).toISOString(),
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
        date: editing.date instanceof Date ? editing.date.toISOString() : new Date(editing.date).toISOString(),
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
    <div className="min-h-screen bg-purple-300 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-700/50 rounded-xl flex items-center justify-center border border-purple-500/50">
              <FaTasks className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Work Sheet</h2>
              <p className="text-purple-200">Track your daily tasks and hours</p>
            </div>
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 p-4 bg-purple-700/30 rounded-xl border border-purple-500/30">
            <select
              name="task"
              value={form.task}
              onChange={handleChange}
              className="px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option className="text-purple-900">Sales</option>
              <option className="text-purple-900">Support</option>
              <option className="text-purple-900">Content</option>
              <option className="text-purple-900">Paper-work</option>
            </select>

            <input
              name="hours"
              type="number"
              value={form.hours}
              onChange={handleChange}
              placeholder="Hours Worked"
              className="px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              min={0}
            />

            <DatePicker
              selected={form.date}
              onChange={(date) => setForm((prev) => ({ ...prev, date }))}
              className="px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 w-full"
              dateFormat="yyyy-MM-dd"
            />

            <button 
              type="submit" 
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FaPlus />
              Add Task
            </button>
          </form>

          {/* Tasks Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-700/50 border-b border-purple-600/50">
                  <th className="p-3 text-left text-white font-semibold">Task</th>
                  <th className="p-3 text-left text-white font-semibold">Hours</th>
                  <th className="p-3 text-left text-white font-semibold">Date</th>
                  <th className="p-3 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t._id} className="border-b border-purple-600/30 hover:bg-purple-700/20 transition-colors duration-200">
                    <td className="p-3 text-white">{t.task}</td>
                    <td className="p-3 text-white font-semibold">{t.hours}</td>
                    <td className="p-3 text-purple-200">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleEdit(t)} 
                          className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300 hover:scale-105 border border-blue-500/30"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(t._id)} 
                          className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300 hover:scale-105 border border-red-500/30"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-purple-200">
                      No tasks recorded yet. Add your first task above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Hours Summary */}
          {tasks.length > 0 && (
            <div className="mt-6 p-4 bg-purple-700/30 rounded-xl border border-purple-500/30">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Total Hours Recorded</span>
                <span className="text-2xl font-bold text-purple-300">
                  {tasks.reduce((sum, task) => sum + (task.hours || 0), 0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-purple-800/90 backdrop-blur-sm rounded-2xl p-6 w-96 border border-purple-600/50 shadow-2xl relative">
            <button 
              onClick={() => setEditing(null)} 
              className="absolute top-4 right-4 text-purple-200 hover:text-white text-2xl font-bold leading-none transition-colors duration-200"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaEdit className="text-purple-300" />
              Edit Task
            </h3>

            <div className="space-y-4">
              <select
                name="task"
                value={editing.task}
                onChange={(e) => setEditing((prev) => ({ ...prev, task: e.target.value }))}
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option className="text-purple-900">Sales</option>
                <option className="text-purple-900">Support</option>
                <option className="text-purple-900">Content</option>
                <option className="text-purple-900">Paper-work</option>
              </select>

              <input
                type="number"
                value={editing.hours}
                onChange={(e) => setEditing((prev) => ({ ...prev, hours: e.target.value }))}
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                min={0}
                placeholder="Hours Worked"
              />

              <DatePicker
                selected={editing.date}
                onChange={(date) => setEditing((prev) => ({ ...prev, date }))}
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                dateFormat="yyyy-MM-dd"
              />

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={() => setEditing(null)} 
                  className="px-6 py-3 bg-purple-600/50 hover:bg-purple-500/50 text-white rounded-xl transition-all duration-300 hover:scale-105 border border-purple-500/30"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate} 
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSheet;