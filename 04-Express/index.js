const express = require('express')
const app = express()
const PORT = 8000;
app.use(express.json())
app.get('/',(req,res)=>{
    res.end(`Homepage`)
});

app.get('/contact-us',(req,res)=>{
    res.end(`You can contact us at hiteshchoudhary@gmail.com`)
});

app.get('/tweets',(req,res)=>{
    res.end(`Here are ur all tweets listed below`)
});

app.post('/tweets',(req,res)=>{
    res.status(201).end(`Tweet posted successfully`)
});

app.listen(PORT,()=>{
    console.log(`You are listening on PORT: ${PORT}`);  
});