const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
//const requireAuth = require("../middleware/requireAuth");

//express router
const router = express.Router();

//Middleware
// router.use(requireAuth);

//get all Taskss
router.get("/", getTasks);

//get a single Tasks
router.get("/:id", getTask);

//post a new Tasks
router.post("/", createTask);

//delete a Tasks
router.delete("/:id", deleteTask);

//Update a Tasks
router.patch("/:id", updateTask);

module.exports = router;
