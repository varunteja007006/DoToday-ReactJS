//Import Mongoose
const mongoose = require("mongoose");
//Get Schema from mongoose
const Schema = mongoose.Schema;

//Create the model using Schema
const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
},{timestamps: true});

module.exports = mongoose.model("Task", taskSchema);
