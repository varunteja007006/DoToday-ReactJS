//Import and export mongoose
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
//Password Hashing
const bcrypt = require("bcrypt");
//validator for email
const validator = require("validator");

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    res.status(400).json({ errorMessage: "No Email or Password is given." });
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ errorMessage: "Email is not valid!!" });
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400).json({ errorMessage: "Password is not strong enough!!" });
  } else {
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400).json({ errorMessage: "Email already in use!" });
    } else {
      //Add salt to avoid password matching
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);
      //pass the values to add data to DB
      const user = await User.create({ email, password: hashed_password });
      res.status(200).json(user);
    }
  }
};

//login user
const loginUser = async (req, res) => {};

//export the actions
module.exports = {
  loginUser,
  signupUser,
};
