import express from "express";

import {
  loginController,
  registerController,
  testController,
  userInfoController,
} from "../controllers/auth.controller.js";

const routes = express.Router();

routes.get("/test", testController);

// register
routes.post("/register", registerController);

// userInfo
routes.get("/user", userInfoController);

// login
routes.post("/login", loginController);
export default routes;
