//Import and export mongoose
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
//Password Hashing
const bcrypt = require("bcrypt");
//validator for email
const validator = require("validator");
//json web token
const jwt = require("jsonwebtoken");
//Generate Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const errorList = [];
  //validation
  if (!email || !password) {
    res.status(400).json({ errorMessage: "No Email or Password is given." });
    errorList.push("No email and password");
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ errorMessage: "Email is not valid!!" });
    errorList.push("Email is not valid");
    return;
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400).json({ errorMessage: "Password is not strong enough!!" });
    errorList.push("Password is not strong enough!!");
    return;
  }
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400).json({ errorMessage: "Email already in use!" });
    return;
  }
  //Add salt to avoid password matching
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);
  //pass the values to add data to DB
  const user = await User.create({ email, password: hashed_password });
  const token = createToken(user._id);
  res.status(200).json({ email, token });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    res.status(400).json({ errorMessage: "No Email or Password is given." });
    return;
  }
  //search for user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ errorMessage: "Incorrect Email!" });
    return;
  }
  //Password validation
  const password_check = await bcrypt.compare(password, user.password);
  if (!password_check) {
    res.status(400).json({ errorMessage: "Password incorrect!" });
  } else {
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  }
};

//export the actions
module.exports = {
  loginUser,
  signupUser,
};
