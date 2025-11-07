const express = require('express');
const app = express()
const PORT = 8000;

app.use(express.json())//middleware to parse the request body into json format
//In memory database
const books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' },
];

app.get('/',(req,res)=>{
    res.end(`Welcome to My Book Store :)`)
});

app.get('/books',(req,res)=>{
    res.json(books);
});

app.get('/books/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const book = books.find((e)=>e.id===id)

    if(isNaN(id)){
        return res.status(400).json({error:`Please Input a id with number `})
    }
    if(!book){
        return res.status(404).json({error:`The book with following id:${id} is not found`})
    }
    return res.json(book);
});

app.post('/books',(req,res)=>{
   const{title,author}= req.body
   if(!title || title === ''){
    return res.status(400).json({error:`Please input the title`})
   }
   if(!author || author === ''){
    return res.status(400).json({error:`Please input the author`})
   }
    const id = books.length+1
    const book = {id,title,author}
    books.push(book);

    return res.status(201).json({message:'Your book has been created successfully'})
});



app.listen(PORT,()=>{
    console.log(`You are listening on PORT:8000`);
})