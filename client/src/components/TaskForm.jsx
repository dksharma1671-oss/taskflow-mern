import { useState } from "react";

const TaskForm = ({ initialData = {}, onSubmit, submitLabel = "Save Task" }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    priority: initialData.priority || "Medium",
    status: initialData.status || "To Do",
    dueDate: initialData.dueDate ? initialData.dueDate.substring(0, 10) : "",
    category: initialData.category || "General",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="Task title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={inputClass}
          placeholder="Task description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className={inputClass}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. Work, Personal"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2.5 font-medium mt-2"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
