import express from "express";
import {
  creatTask,
  deleteTask,
  getAllCompleteTasksByUser,
  getAllImportantTasksByUser,
  getAllIncompleteTasksByUser,
  getAllTasksByUser,
  updateCompleteTask,
  updateImportantTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// create task
router.post("/creat-task", creatTask);

// get All Tasks
router.get("/getAllTasks", getAllTasksByUser);

// get All Important Tasks
router.get("/getImportantTasks", getAllImportantTasksByUser);

// Get all Complete tasks
router.get("/getCompleteTasks", getAllCompleteTasksByUser);

// Get all Incomplete tasks
router.get("/getIncompleteTasks", getAllIncompleteTasksByUser);

// Delete Task
router.delete("/deleteTask/:id", deleteTask);

// Update Task
router.put("/updateTask/:id", updateTask);

// Update Important Task property
router.put("/updateImportantTask/:id", updateImportantTask);

// update complete task
router.put("/updateCompleteTask/:id", updateCompleteTask);

export default router;
