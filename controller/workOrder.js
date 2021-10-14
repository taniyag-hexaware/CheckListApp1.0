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
        res.status(201).send({
          result:data
        });
    }).catch(err => {
       logger.error("Something went wrong while creating new workOrder.")
        res.status(500).send({
            result: err.message || "Something went wrong while creating new workOrder."
        });
    });


};

//To display all the workorders
exports.getAllWorkOrders = (req, res) => {

    workOrder.find()
    .select('name')
        .sort("-createdAt")
        .exec((err, workOrders) => {
            // error checking
            if (err || !workOrders) {
              logger.error("400 Bad Request Error")
                return res.status(400).json({
                    result: "Something went wrong in finding all workOrders",
                });
            }
            // return all the workOrder in json format
            res.status(200).json({
             result:workOrders
            });  
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
                   result: "workOrder not found with id " + req.params.id
                });
            }

            res.status(200).send({result:workOrder});
            logger.info("workOrder found with id " + req.params.id)


        }).catch(err => {
            if (err.kind === 'ObjectId') {
              logger.error("404 - workOrder not found with id " + req.params.id)
                return res.status(404).send({
                   result: "workOrder not found with id " + req.params.id
                });
            }
            logger.error("Error getting workOrder with id " + req.params.id)
            return res.status(500).send({
               result: "Error getting workOrder with id " + req.params.id
            });
        });
};


//To update a workorder
exports.updateWorkOrder = (req, res) => {
    // Validate Request

  if (!req.body) {
    logger.error("400 - Bad Request Error")
    return res.status(400).send({
     result: "Please fill all required field"
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
         result: "workOrder not found with id " + req.params.id
        });
      }
      res.status(201).send({result:workOrder});
      logger.info("workOrder updated")
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        logger.error("404 - workOrder not found with id " + req.params.id)
        return res.status(404).send({
         result: "workOrder not found with id 2" + req.params.id
        });
      }
      logger.error("Error updating workOrder with id 3" + req.params.id)
      return res.status(500).send({
       result: "Error updating workOrder with id 3" + req.params.id
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
           result: "workOrder not found with id " + req.params.id
          });
        }
        res.status(200).send({result: "workOrder deleted successfully!" });
        logger.info("workOrder deleted successfully")
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          logger.error("404 - workOrder not found with id " + req.params.id)
          return res.status(404).send({
           result: "workOrder not found with id " + req.params.id
          });
        }
        logger.error("Could not delete workOrder with id " + req.params.id)
        return res.status(500).send({
         result: "Could not delete workOrder with id " + req.params.id
        });
      });
  };

  
