import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTask } from "../services/taskService";
import TaskForm from "../components/TaskForm";
import Sidebar from "../components/Sidebar";

const CreateTask = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createTask(formData);
      toast.success("Task created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      <Sidebar />
      <div className="flex-1 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
        <TaskForm onSubmit={handleCreate} submitLabel="Create Task" />
      </div>
    </div>
  );
};

export default CreateTask;
