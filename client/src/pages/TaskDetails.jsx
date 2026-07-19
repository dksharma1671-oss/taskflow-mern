import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getTaskById, deleteTask, updateTask } from "../services/taskService";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { FiEdit2, FiTrash2, FiCheckCircle, FiArrowLeft } from "react-icons/fi";

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

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const { data } = await getTaskById(id);
      setTask(data.task);
    } catch (error) {
      toast.error("Task not found");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleMarkComplete = async () => {
    try {
      await updateTask(id, { status: "Completed" });
      toast.success("Task marked as completed");
      fetchTask();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      <Sidebar />
      <div className="flex-1 max-w-2xl">
        <Link to="/dashboard" className="flex items-center gap-2 text-sm text-primary-600 mb-4 hover:underline w-fit">
          <FiArrowLeft /> Back to Dashboard
        </Link>

        {loading ? (
          <Loader />
        ) : task ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{task.title}</h1>
              <span className={`text-xs px-2 py-1 rounded-full ${priorityColor[task.priority]}`}>
                {task.priority} Priority
              </span>
            </div>

            {task.description && <p className="text-gray-600 dark:text-gray-300">{task.description}</p>}

            <div className="flex flex-wrap gap-2 text-sm">
              <span className={`px-3 py-1 rounded-full ${statusColor[task.status]}`}>{task.status}</span>
              {task.category && (
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">{task.category}</span>
              )}
              {task.dueDate && (
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-400">
              Created: {new Date(task.createdAt).toLocaleString()}
            </p>

            <div className="flex gap-4 mt-3 border-t dark:border-gray-700 pt-4">
              {task.status !== "Completed" && (
                <button onClick={handleMarkComplete} className="flex items-center gap-1 text-green-600 hover:underline text-sm">
                  <FiCheckCircle /> Mark Complete
                </button>
              )}
              <Link to={`/tasks/edit/${task._id}`} className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
                <FiEdit2 /> Edit
              </Link>
              <button onClick={handleDelete} className="flex items-center gap-1 text-red-600 hover:underline text-sm">
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TaskDetails;
