import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
});

export const postModel = mongoose.model("post", postSchema);