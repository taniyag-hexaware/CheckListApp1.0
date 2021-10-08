const task = require("../models/task");

//To create a new task
exports.createtask  = (req, res) => {

    const Task  = new task ({
        task_name: req.body.task_name,
        task_description: req.body.task_description,
        wordOrderId: req.body.wordOrderId
    
    });

    Task.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new task."
        });
    });


};

//To get all the tasks
exports.getAlltasks = (req, res) => {

    task.find()
        .sort("-createdAt")
        .exec((err, tasks) => {
            // error checking
            if (err || !tasks) {
                return res.status(400).json({
                    error: "Something went wrong in finding all tasks",
                });
            }
            // return all the task in json format
            res.json(tasks);
        });
};

//To get a task by workorderId
exports.gettaskbywork = (req, res) => {
 console.log("req",req.params.id);
   task.find({'wordOrderId':req.params.id})
    .sort("-createdAt")
    .then(task => {
        if (!task) {
            return res.status(404).send({
                message: "task not found with id 1" + req.params.id
            });
        }

        res.send(task);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found with id 2" + req.params.id
            });
        }
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
                return res.status(404).send({
                    message: "task not found with id 1" + req.params.id
                });
            }

            res.send(task);

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "task not found with id 2" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error getting task with id 3" + req.params.id
            });
        });
};


//To update a task
exports.updatetask = (req, res) => {
    // Validate Request
 
  if (!req.body) {
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
        return res.status(404).send({
          message: "task not found with id 1" + req.params.id
        });
      }
      res.send(task);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "task not found with id 2" + req.params.id
        });
      }
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
          return res.status(404).send({
            message: "task not found with id " + req.params.id
          });
        }
        res.send({ message: "task deleted successfully!" });
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: "task not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          message: "Could not delete task with id " + req.params.id
        });
      });
  };
