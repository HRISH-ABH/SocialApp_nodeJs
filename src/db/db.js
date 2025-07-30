import mongoose from "mongoose";

export  const connectDb=()=>{
    try {
         mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DB connected");
        
    })
    } catch (error) {
        console.log(error);
        
    }
   
}