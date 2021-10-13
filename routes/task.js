const express = require("express");
const router = express.Router();

// these are the controllers
const {
  createtask,
  gettask,
  deletetask,
  getAlltasks,
  updatetask,
  gettaskbywork,
} = require("../controller/task");



// to get all the task
router.get("/tasks/", getAlltasks);

// to get a single task
router.get("/task/:id/", gettask);

// to get a task by workid
router.get("/taskwork/:id/", gettaskbywork);

// to create a task
router.post("/task/create/", createtask);

// to update the task
router.put("/task/update/:id/", updatetask);

// to delete the task
router.delete("/task/delete/:id/", deletetask);

// we will export the router to import it in the index.js
module.exports = router;
