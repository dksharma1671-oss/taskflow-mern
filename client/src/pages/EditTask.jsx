import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTaskById, updateTask } from "../services/taskService";
import TaskForm from "../components/TaskForm";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
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
    fetchTask();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      await updateTask(id, formData);
      toast.success("Task updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      <Sidebar />
      <div className="flex-1 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
        {loading ? <Loader /> : task && <TaskForm initialData={task} onSubmit={handleUpdate} submitLabel="Update Task" />}
      </div>
    </div>
  );
};

export default EditTask;
