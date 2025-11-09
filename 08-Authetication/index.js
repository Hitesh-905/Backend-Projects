import express from 'express'
const app = express()
const PORT = 8000;

app.use(express.json())
const DIARY = {};
const EMAIL= new Set()//email is basically a unique carID 

//signup route - that creates a new user in the diary and returns back a token 
app.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;

    if(EMAIL.has(email)){
        return res.status(400).json({error: `Email already exists`})
    }
    const token  =`${Date.now()}`
    DIARY[token] = {name,email,password};
    EMAIL.add(email)
    res.status(201).json({message:`Success`,token})
});

app.post('/me',(req,res)=>{
    const {token} = req.body;
    if(!token){
        return res.status(400).json({error:`Missing token`})
    }

    if(!(token in DIARY)){
        return res.status(400).json({error:`Unknown/Invalid token`})
    }

    const entry = DIARY[token]
    res.status(200).json({data:entry})
});
app.listen(PORT,()=>{
    console.log(`You are listening on PORT: ${PORT}`);
    
});