const booksTable = require('../models/book.model.js')
const db = require('../db');


exports.homePaage = function(req,res){
    res.end(`Welcome to My Book Store :)`)
}
exports.getAllBooks = function(req,res){
     res.json(BOOKS);
}

exports.getBookByID = function(req,res){
     const id = parseInt(req.params.id)
    const book = BOOKS.find((e)=>e.id===id)

    if(isNaN(id)){
        return res.status(400).json({error:`Please Input a id with number `})
    }
    if(!book){
        return res.status(404).json({error:`The book with following id:${id} is not found`})
    }
    return res.json(book);
};

exports.createBook = (req,res)=>{
       const{title,author}= req.body
   if(!title || title === ''){
    return res.status(400).json({error:`Please input the title`})
   }
   if(!author || author === ''){
    return res.status(400).json({error:`Please input the author`})
   }
    const id = BOOKS.length+1
    const book = {id,title,author}
    BOOKS.push(book);

    return res.status(201).json({message:'Your book has been created successfully'})
};

exports.deleteBookByID = function(req,res){
      const id = parseInt(req.params.id)
      if(isNaN(id)){
        return res.status(400).json({error:`Please Input a id with number `})
    }
    const indexToDelete = BOOKS.findIndex((eq)=>eq.id ===id)
    BOOKS.splice(indexToDelete,1);

    return res.status(201).json({messsge: 'Book successfully deleted'})
};