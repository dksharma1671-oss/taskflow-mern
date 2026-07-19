import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiCheckCircle } from "react-icons/fi";

const priorityColor = {
  Low: "bg-gray-200 text-gray-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

const statusColor = {
  "To Do": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const TaskCard = ({ task, onDelete, onMarkComplete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <Link to={`/tasks/${task._id}`} className="font-semibold hover:text-primary-600">
          {task.title}
        </Link>
        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 items-center text-xs mt-1">
        <span className={`px-2 py-0.5 rounded-full ${statusColor[task.status]}`}>{task.status}</span>
        {task.category && (
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{task.category}</span>
        )}
        {task.dueDate && (
          <span className="text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>

      <div className="flex gap-3 mt-2 text-sm">
        {task.status !== "Completed" && (
          <button
            onClick={() => onMarkComplete(task._id)}
            className="flex items-center gap-1 text-green-600 hover:underline"
          >
            <FiCheckCircle /> Complete
          </button>
        )}
        <Link to={`/tasks/edit/${task._id}`} className="flex items-center gap-1 text-blue-600 hover:underline">
          <FiEdit2 /> Edit
        </Link>
        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-1 text-red-600 hover:underline"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
