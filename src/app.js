import express from 'express';
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import cookieParser from "cookie-parser";

const app=express();
app.use(express.json());
app.use(cookieParser());


//auth Routes
app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);


export default app;