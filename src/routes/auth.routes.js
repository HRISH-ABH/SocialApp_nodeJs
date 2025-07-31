import express from "express";



import { registerController, testController, userInfoController } from "../controllers/auth.controller.js";

const routes = express.Router();

routes.get("/test", testController);

// register
routes.post("/register", registerController);

routes.get("/user", userInfoController);
export default routes;
