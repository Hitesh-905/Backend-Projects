import express from 'express'
const app  = express()
const PORT = 8000

app.use(express.json())//in built middleware


app.listen(PORT,()=>{
    console.log(`Your server is running on PORT: ${PORT}`);
    
})