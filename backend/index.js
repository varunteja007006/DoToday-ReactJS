//to load the env variables
require("dotenv").config();
//Import express App
const express = require("express");
//Import mongoose to communicate with mongo db
const mongoose = require("mongoose");
//Import CORS
const cors = require("cors");
//Import routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

//Express app
const app = express();

//use middleware
app.use(express.json());

// Middleware to console log the req path, method
// Useful for troubleshooting
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

//To avoid CORS error
app.use(cors());

//Add routes
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

//connect to Mongo DB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "DoToday" })
  .then(() => {
    console.log("connected to MongoDB");
    //listen for requests on the port
    app.listen(process.env.PORT, () => {
      console.log("Running on port : ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
