
import express from 'express';
import userRouter from './routes/user.routes.js'
const app = express()
const PORT = process.env.PORT ?? 8000;


app.use(express.json())//default middleware for json request

app.get('/',(req,res)=>{
    return res.status(200).json(`Server is Up and running`)
});

app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`You are listening on PORT: ${PORT}`);
});