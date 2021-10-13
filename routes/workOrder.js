const express = require("express");
const router = express.Router();

// these are the controllers
const {
    createWorkOrder,
    getWorkOrder,
    deleteWorkOrder,
    getAllWorkOrders,
    updateWorkOrder,
} = require("../controller/workOrder");



// to get all the WorkOrder
router.get("/workOrders/", getAllWorkOrders);

// to get a single WorkOrder
router.get("/workOrder/:id/", getWorkOrder);

// to create a WorkOrder
router.post("/workOrder/create/", createWorkOrder);

// to update the WorkOrder
router.put("/workOrder/update/:id", updateWorkOrder);

// to delete the WorkOrder
router.delete("/workOrder/delete/:id", deleteWorkOrder);

// we will export the router to import it in the index.js
module.exports = router;
