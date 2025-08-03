import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";
import jwt from "jsonwebtoken";
import generateCaption from "../service/ai.service.js";

const createPostController = async (req, res) => {

    const file=req.file;
    console.log("File recieved: ",file);

    const base64ImageFile=new Buffer.from(file.buffer).toString('base64');

    const caption=await generateCaption(base64ImageFile);

    res.send(caption);
    
    
};

export {
    createPostController
}