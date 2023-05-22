const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");
//express router
const router = express.Router();

//login route
router.post("/login", loginUser);
//signup route
router.post("/signup", () => {});

module.exports = router;
