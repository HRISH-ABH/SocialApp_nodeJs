import express from 'express';
import authRoutes from './routes/auth.routes.js'

const app=express();
app.use(express.json());


//auth Routes
app.use("/auth",authRoutes)


export default app;