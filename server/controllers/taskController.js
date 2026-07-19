const Task = require("../models/Task");

// @desc    Get all tasks of logged in user (with search, filter, sort)
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const { search, status, priority, category, sortBy, order } = req.query;

    // Sirf logged-in user ke tasks
    const query = { userId: req.user._id };

    if (search) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive search
    }
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    let sortOptions = { createdAt: -1 }; // default: newest first
    if (sortBy) {
      sortOptions = { [sortBy]: order === "asc" ? 1 : -1 };
    }

    const tasks = await Task.find(query).sort(sortOptions);

    // Dashboard stats bhi yahin bhej dete hain taaki extra call na karni pade
    const totalTasks = await Task.countDocuments({ userId: req.user._id });
    const completedTasks = await Task.countDocuments({ userId: req.user._id, status: "Completed" });
    const pendingTasks = await Task.countDocuments({ userId: req.user._id, status: "To Do" });
    const inProgressTasks = await Task.countDocuments({ userId: req.user._id, status: "In Progress" });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      stats: { totalTasks, completedTasks, pendingTasks, inProgressTasks },
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Get single task by id
// @route   GET /api/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    return res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, category } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      category,
      userId: req.user._id,
    });

    return res.status(201).json({ success: true, message: "Task created", task });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ success: true, message: "Task updated", task });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    await task.deleteOne();

    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
