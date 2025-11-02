import express from 'express'
const app  = express()
const PORT = process.env.PORT??8000;

app.use(express.json())//in built middleware

app.get('/',(req,res)=>{
    return res.status(200).json({message:`you are on homepage`})
});

app.listen(PORT,()=>{
    console.log(`Your server is running on PORT: ${PORT}`);
    
});