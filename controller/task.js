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
    res.status(201).send({result:data});
  }).catch(err => {
    logger.error("This is an internal server error")
    res.status(500).send({

      result: err.message || "Something went wrong while creating new task."
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
          result: "Something went wrong in finding all tasks",
        });
      }
      logger.info("All tasks found")
      // return all the task in json format
      res.status(200).json({result:tasks});
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
          result: "task not found with id " + req.params.id
        });
      }
      logger.info("Tasks with workOrderId " + req.params.id + " found successfully")
      res.status(200).send({result:task});
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        logger.error("Incorrect workOrderId " + req.params.id)
        return res.status(404).send({
          result: "task not found with id " + req.params.id
        });
      }
      logger.error("This is an internal server error")
      return res.status(500).send({
        result: "Error getting task with id " + req.params.id
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
          result: "task not found with id " + req.params.id
        });
      }

      res.status(200).send({result:task});
      logger.info("Task found with id " + req.params.id)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        logger.error("Incorrect taskId " + req.params.id)
        return res.status(404).send({
          result: "task not found with id " + req.params.id
        });
      }
      logger.error("This is an internal server error")
      return res.status(500).send({
        result: "Error getting task with id " + req.params.id
      });
    });
};


//To update a task
exports.updatetask = (req, res) => {
  // Validate Request

  if (!req.body) {
    logger.warn("Incomplete Body")
    return res.status(400).send({
      result: "Please fill all required field"
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
          result: "task not found with id " + req.params.id
        });
      }
      logger.info("The task with taskId " + req.params.id + " is updated")
      res.status(201).send({result:task});
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        logger.error("Incorrect taskId " + req.params.id)
        return res.status(404).send({
          result: "task not found with id " + req.params.id
        });
      }
      logger.error("This is an internal server error")
      return res.status(500).send({
        result: "Error updating task with id " + req.params.id
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
          result: "task not found with id " + req.params.id
        });
      }
      logger.info("The task with taskId " + req.params.id + " is deleted")
      res.status(200).send({ result: "task deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        logger.error("Incorrect taskId " + req.params.id)
        return res.status(404).send({
          result: "task not found with id " + req.params.id
        });
      }
      logger.error("This is an internal server error")
      return res.status(500).send({
        result: "Could not delete task with id " + req.params.id
      });
    });
};
