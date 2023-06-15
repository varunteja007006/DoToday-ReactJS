const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const requireAuth = require("../middlewares/requireAuth");

//express router
const router = express.Router();

//Middleware
router.use(requireAuth);

//get all Tasks
router.get("/", getTasks);

//get a single Task
router.get("/:id", getTask);

//post a new Task
router.post("/", createTask);

//delete a Task
router.delete("/:id", deleteTask);

//Update a Task
router.patch("/:id", updateTask);

module.exports = router;
