const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

// import routes
const userRoutes = require("./routes/auth");

// initialize dotenv
const app = express();

dotenv.config();

// connections to mongodb
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("connections have been made to database");
  }
);

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// user routes
app.use("/api/auth/", userRoutes);

// set up backend server
app.listen(5000, () => {
  console.log("backend server is running");
});
