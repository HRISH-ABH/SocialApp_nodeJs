import app from './src/app.js'
import dotenv from 'dotenv'
dotenv.config();
import { connectDb } from './src/db/db.js';
connectDb();


const PORT=process.env.PORT || 8000


app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
    
})