import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getTasks, deleteTask, updateTask } from "../services/taskService";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import Loader from "../components/Loader";
import { FiPlus } from "react-icons/fi";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getTasks({ search, status, priority, sortBy, order: "desc" });
      setTasks(data.tasks);
      setStats(data.stats);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [search, status, priority, sortBy]);

  useEffect(() => {
    // Debounce search thoda taaki har keystroke pe API call na jaaye
    const timer = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      await updateTask(id, { status: "Completed" });
      toast.success("Task marked as completed");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      <Sidebar />

      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <DashboardCards stats={stats} />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <FilterDropdown label="All Status" value={status} onChange={setStatus} options={["To Do", "In Progress", "Completed"]} />
          <FilterDropdown label="All Priority" value={priority} onChange={setPriority} options={["Low", "Medium", "High"]} />
          <FilterDropdown label="Sort: Newest" value={sortBy} onChange={setSortBy} options={["dueDate", "priority", "title"]} />
          <Link
            to="/tasks/create"
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
          >
            <FiPlus /> Add Task
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-400 py-16">No tasks found. Create your first task!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={handleDelete} onMarkComplete={handleMarkComplete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
