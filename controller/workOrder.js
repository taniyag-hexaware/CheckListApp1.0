const workOrder = require("../models/workOrder");


//To create a workOrder
exports.createWorkOrder = (req, res) => {

    const WorkOrder = new workOrder({
        name: req.body.name,
        description: req.body.description
        });

    WorkOrder.save().then(data => {
        res.send(data);
    }).catch(err => {
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
                return res.status(400).json({
                    error: "Something went wrong in finding all workOrders",
                });
            }
            // return all the workOrder in json format
            res.json(workOrders);
            console.log(workOrders)
            
            
        });
};

//To display a particular work order
exports.getWorkOrder = (req, res) => {

    workOrder.findById(req.params.id)
        .then(workOrder => {
            if (!workOrder) {
                return res.status(404).send({
                    message: "workOrder not found with id 1" + req.params.id
                });
            }

            res.send(workOrder);

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "workOrder not found with id 2" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error getting workOrder with id 3" + req.params.id
            });
        });
};


//To update a workorder
exports.updateWorkOrder = (req, res) => {
    // Validate Request

  if (!req.body) {
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
        return res.status(404).send({
          message: "workOrder not found with id 1" + req.params.id
        });
      }
      res.send(workOrder);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "workOrder not found with id 2" + req.params.id
        });
      }
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
          return res.status(404).send({
            message: "workOrder not found with id " + req.params.id
          });
        }
        res.send({ message: "workOrder deleted successfully!" });
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: "workOrder not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          message: "Could not delete workOrder with id " + req.params.id
        });
      });
  };
