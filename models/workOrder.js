const mongoose = require("mongoose");

const workOrder = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("workOrder", workOrder);