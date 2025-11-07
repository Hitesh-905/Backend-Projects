const express = require('express');
const app = express()
const PORT = 8000;

app.json(express.json())//middleware to parse the request body into json format
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


app.listen(PORT,()=>{
    console.log(`You are listening on PORT:8000`);
})