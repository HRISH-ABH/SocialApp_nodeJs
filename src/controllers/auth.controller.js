import bcrypt from "bcryptjs";

import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const testController = (req, res) => {
  console.log("Running!!");
  res.send("Running");
};

const registerController = async (req, res) => {
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
      return res.status(409).json({
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
      return res.status(201).json({
        message: "user created successfully!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      mssg: error,
    });
  }
};

const userInfoController = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      const user = await userModel
        .findOne({ _id: decoded.id })
        .select("-password");
      return res.status(200).json({
        message: "User details fetched",
        user,
      });
    } else {
      return res.status(401).json({
        message: "Invalid or broken token",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Empty Credentials!!",
    });
  }
  try {
    const userExists = await userModel.findOne({ username });
    if (!userExists) {
      return res.status(404).json({
        message: "Create a user first!",
      });
    }
    const isValidPassword = await bcrypt.compare(password, userExists.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET,{expiresIn:"1h"});

    res.cookie("token", token);

    res.status(200).json({
      message: "Login successfull!!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
export { registerController, testController, userInfoController ,loginController};
