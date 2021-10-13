const task = require("../models/task");
const logger = require('../logger')


//To create a new task
exports.createtask = (req, res) => {

  const Task = new task({
    task_name: req.body.task_name,
    task_description: req.body.task_description,
    wordOrderId: req.body.wordOrderId

  });

  Task.save().then(data => {
    res.send(data);
  }).catch(err => {
    logger.error("This is an internal server error")
    res.status(500).send({

      message: err.message || "Something went wrong while creating new task."
    });

  });


};

//To get all the tasks
exports.getAlltasks = (req, res) => {
  task.find({}).select('task_name')
    .sort("-createdAt")
    .exec((err, tasks) => {
      // error checking
      if (err || !tasks) {
        logger.error("Bad request. Tasks cannot be found")
        return res.status(400).json({
          error: "Something went wrong in finding all tasks",
        });
      }
      logger.info("All tasks found")
      // return all the task in json format
      res.json(tasks);
    });
};

//To get a task by workorderId
exports.gettaskbywork = (req, res) => {
  task.find({ 'wordOrderId': req.params.id }).select('task_name task_description')
    .sort("-createdAt")
    .then(task => {
      if (!task) {
        logger.warn("The workOrderId " + req.params.id + " does not exist")
        return res.status(404).send({
          message: "task not found with id 1" + req.params.id
        });
      }
      logger.info("Tasks with workOrderId " + req.params.id + " found successfully")
      res.send(task);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        logger.error("Incorrect workOrderId " + req.params.id)
        return res.status(404).send({
          message: "task not found with id 2" + req.params.id
        });
      }
      logger.error("This is an internal server error")
      return res.status(500).send({
        message: "Error getting task with id 3" + req.params.id
      });
    });
};


//To get all the task by taskid
exports.gettask = (req, res) => {

  task.findById(req.params.id)
    .then(task => {
      if (!task) {
        logger.warn("The taskId " + req.params.id + " does not exist")
        return res.status(404).send({
          message: "task not found with id 1" + req.params.id
        });
      }

      res.send(task);
      logger.info("Task found with id " + req.params.id)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        logger.error("Incorrect taskId " + req.params.id)
        return res.status(404).send({
          message: "task not found with id 2" + req.params.id
        });
      }
      logger.error("This is an internal server error")
      return res.status(500).send({
        message: "Error getting task with id 3" + req.params.id
      });
    });
};


//To update a task
exports.updatetask = (req, res) => {
  // Validate Request

  if (!req.body) {
    logger.warn("Incomplete Body")
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find task and update it with the request body
  task.findByIdAndUpdate(req.params.id, {
    task_name: req.body.task_name,
    task_description: req.body.task_description,
    wordOrderId: req.body.wordOrderId


  }, { new: true })
    .then(task => {
      if (!task) {
        logger.warn("The taskId " + req.params.id + " does not exist")
        return res.status(404).send({
          message: "task not found with id 1" + req.params.id
        });
      }
      logger.info("The task with taskId " + req.params.id + " is updated")
      res.send(task);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        logger.error("Incorrect taskId " + req.params.id)
        return res.status(404).send({
          message: "task not found with id 2" + req.params.id
        });
      }
      logger.error("This is an internal server error")
      return res.status(500).send({
        message: "Error updating task with id 3" + req.params.id
      });
    });
};


//To delete a task
exports.deletetask = (req, res) => {
  task.findByIdAndRemove(req.params.id)
    .then(task => {
      if (!task) {
        logger.warn("The taskId " + req.params.id + " does not exist")
        return res.status(404).send({
          message: "task not found with id " + req.params.id
        });
      }
      logger.info("The task with taskId " + req.params.id + " is deleted")
      res.send({ message: "task deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        logger.error("Incorrect taskId " + req.params.id)
        return res.status(404).send({
          message: "task not found with id " + req.params.id
        });
      }
      logger.error("This is an internal server error")
      return res.status(500).send({
        message: "Could not delete task with id " + req.params.id
      });
    });
};
