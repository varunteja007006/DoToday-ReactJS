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
  //validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ errorMessage: "No Email or Password is given." });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ errorMessage: "Email is not valid!!" });
  }
  if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({ errorMessage: "Password is not strong enough!!" });
  }
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ errorMessage: "Email already in use!" });
  }
  //Add salt to avoid password hashing
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
    return res
      .status(400)
      .json({ errorMessage: "No Email or Password is given." });
  }
  //search for user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ errorMessage: "Incorrect Email!" });
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
