import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";
import jwt from "jsonwebtoken";
import generateCaption from "../service/ai.service.js";
import uploadImage from "../service/storage.service.js";
import { v4 as uuidv4} from "uuid";

const createPostController = async (req, res) => {

    const file=req.file;
    console.log("File recieved: ",file);
    if(!file){
        return res.status(400).json({
            message:"Please provide a file",
        })
    }
try {
    
    const base64ImageFile=new Buffer.from(file.buffer).toString('base64');

    const caption=await generateCaption(base64ImageFile);
    const result=await uploadImage(file.buffer,uuidv4());

    const post=await postModel.create({
        caption:caption,
        image:result.url,
        user:req.user._id
    })

  res.status(201).json({
    message:"post created successfully",
    post,
    
  });
} catch (error) {
     return res.status(500).json({
            message:error.message,
        })
}
    
    
};

export {
    createPostController
}