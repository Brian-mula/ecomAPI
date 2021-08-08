const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

// import user model
const User = require("../models/Users");

// register a new user route
router.post("/register", async (req, res) => {
  try {
    const hashedpass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpass,
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// user login route
router.post("/login", async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    // compare password
    const validpass = await bcrypt.compare(req.body.password, user.password);
    !validpass && res.status(403).json("incorrect password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// edit user information
router.put("/user/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("user information updated successfully");
    } catch (error) {
      console.log(error);
    }
  }
});

// delete a user
router.delete("/user/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("you can only delete your account");
  }
});

module.exports = router;
