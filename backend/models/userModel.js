//Get Mongoose
const mongoose = require("mongoose");
//Get Schema from mongoose
const Schema = mongoose.Schema;

//Create the model using Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
