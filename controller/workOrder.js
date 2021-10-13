const workOrder = require("../models/workOrder");
const logger = require('../logger')


//To create a workOrder
exports.createWorkOrder = (req, res) => {

    const WorkOrder = new workOrder({
        name: req.body.name,
        description: req.body.description
        });

    WorkOrder.save().then(data => {
       logger.info("Successfully inserted a workOrder")
        res.send(data);
    }).catch(err => {
       logger.error("This is an internal server error")
        res.status(500).send({
            message: err.message || "Something went wrong while creating new workOrder."
        });
    });


};

//To display all the workorders
exports.getAllWorkOrders = (req, res) => {

    workOrder.find()
        .sort("-createdAt")
        .exec((err, workOrders) => {
            // error checking
            if (err || !workOrders) {
              logger.error("400 Bad Request Error")
                return res.status(400).json({
                    error: "Something went wrong in finding all workOrders",
                });
            }
            // return all the workOrder in json format
            res.json(workOrders);  
            logger.info("All the workOrders are displayed")         
            
        });
};

//To display a particular work order
exports.getWorkOrder = (req, res) => {

    workOrder.findById(req.params.id)
        .then(workOrder => {
            if (!workOrder) {
              logger.warn("404 - This workOrder with id " + req.params.id + " does not exist")
                return res.status(404).send({
                    message: "workOrder not found with id 1" + req.params.id
                });
            }

            res.send(workOrder);
            logger.info("workOrder found with id " + req.params.id)


        }).catch(err => {
            if (err.kind === 'ObjectId') {
              logger.error("404 - workOrder not found with id " + req.params.id)
                return res.status(404).send({
                    message: "workOrder not found with id 2" + req.params.id
                });
            }
            logger.error("500 - This is an internal server error")
            return res.status(500).send({
                message: "Error getting workOrder with id 3" + req.params.id
            });
        });
};


//To update a workorder
exports.updateWorkOrder = (req, res) => {
    // Validate Request

  if (!req.body) {
    logger.error("400 - Bad Request Error")
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find workOrder and update it with the request body
  workOrder.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description

  }, { new: true })
    .then(workOrder => {
      if (!workOrder) {
        logger.error("404 - workOrder not found with id " + req.params.id)
        return res.status(404).send({
          message: "workOrder not found with id 1" + req.params.id
        });
      }
      res.send(workOrder);
      logger.info("workOrder updated")
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        logger.error("404 - workOrder not found with id " + req.params.id)
        return res.status(404).send({
          message: "workOrder not found with id 2" + req.params.id
        });
      }
      logger.error("500 - This is an internal server error")
      return res.status(500).send({
        message: "Error updating workOrder with id 3" + req.params.id
      });
    });
};


//To delete a workorder
exports.deleteWorkOrder = (req, res) => {
    workOrder.findByIdAndRemove(req.params.id)
      .then(workOrder => {
        if (!workOrder) {
          logger.error("404 - workOrder not found with id " + req.params.id)
          return res.status(404).send({
            message: "workOrder not found with id " + req.params.id
          });
        }
        res.send({ message: "workOrder deleted successfully!" });
        logger.info("workOrder deleted successfully")
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          logger.error("404 - workOrder not found with id " + req.params.id)
          return res.status(404).send({
            message: "workOrder not found with id " + req.params.id
          });
        }
        logger.error("500 - This is an internal server error")
        return res.status(500).send({
          message: "Could not delete workOrder with id " + req.params.id
        });
      });
  };

  
