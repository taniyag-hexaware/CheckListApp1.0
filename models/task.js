const mongoose = require("mongoose");

const task = new mongoose.Schema(
    {
        task_name:{
            type:String,
            required:true
        },
        task_description:{
            type:String
        },
        wordOrderId:{
            type:mongoose.Schema.Types.ObjectId, ref:'workOrder'
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("task", task);