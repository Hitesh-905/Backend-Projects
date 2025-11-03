import express from 'express'
import userRouter from './routes/users.routes.js'
const app  = express()
const PORT = process.env.PORT??3000;

app.use(express.json())//in built middleware

app.get('/',(req,res)=>{
    return res.status(200).json({message:`you are on homepage`})
});

app.use('/user', userRouter)

app.listen(PORT,()=>{
    console.log(`Your server is running on PORT: ${PORT}`);
    
});