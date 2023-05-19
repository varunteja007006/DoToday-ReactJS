//Import and export mongoose
const { default: mongoose } = require("mongoose");
const Task = require("../models/taskModel");

//get all workouts
const getTasks = async (req, res) => {
  //   const user_id = req.user._id;
  const tasks = await Task.find({}).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

//get single workout
const getTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such task" });
  }
  const task = await Task.findById(id);
  if (!task) {
    res.status(404).json({ error: "no such task" });
  }
  res.status(200).json(task);
};

//create a new workout
const createTask = async (req, res) => {
  const { taskName } = req.body;
  //validate if fields are empty
  let emptyFields = [];
  if (!taskName) {
    emptyFields.push("taskName");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill the necessary fields", emptyFields });
  }
  //add doc to DB
  try {
    //const user_id = req.user._id;
    const task = await Task.create({ taskName, status: false });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such task" });
  }
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    res.status(404).json({ error: "no such task" });
  }
  res.status(200).json(task);
};

//update a workout
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such task" });
  }
  //pass two objects into findOneAndUpdate , find criteria & which has to be updated
  const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!task) {
    res.status(404).json({ error: "no such task" });
  }
  res.status(200).json(task);
};

//export the actions
module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
};
