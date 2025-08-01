import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";
import jwt from "jsonwebtoken";

const createPostController = async (req, res) => {

    const file=req.file;
  res.send("inside post controller")
};

export {
    createPostController
}