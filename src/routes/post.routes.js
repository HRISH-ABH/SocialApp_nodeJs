import express from "express";
import { createPostController } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const routes = express.Router();

// posts
routes.post("/",
    authMiddleware, 
    upload.single("image"), 
    createPostController);

export default routes;
