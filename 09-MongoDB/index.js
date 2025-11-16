import express from 'express'
import {connectMongoDB} from './connection.js'
import 'dotenv/config';
const app = express();
const PORT = 8000;
connectMongoDB(process.env.MONGODB_URL).then(()=> console.log(`MongoDB connected`));
app.use(express.json())
function logged(req,res){
 console.log("under maintenance")
}
app.listen(PORT,()=>{
    console.log(`You are listening on PORT:${PORT}`);
    
}):