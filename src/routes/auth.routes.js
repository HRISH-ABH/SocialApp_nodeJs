import express from "express";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const routes = express.Router();

routes.get("/test", (req, res) => {
  console.log("Checking server!!!");
  res.send("Running");
});

// register
routes.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send({
      message: "Please enter the credentials!!",
    });
  }

  try {
    // check if user already present
    const user = await userModel.findOne({ username });
    if (user) {
      return res.json({
        message: "User already exists please signIn",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        username: username,
        password: hashPassword,
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token);
      return res.json({
        message: "user created successfully!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      mssg: error,
    });
  }
});
export default routes;
