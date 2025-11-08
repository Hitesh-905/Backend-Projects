const booksTable = require('../models/book.model.js')
const db = require('../db');
const {eq} = require('drizzle-orm')


exports.homePaage = function(req,res){
    res.end(`Welcome to My Book Store :)`)
}
exports.getAllBooks = async function(req,res){
     const books = await db.select().from(booksTable)
     return res.json(books);
}

exports.getBookByID = async function(req,res){
     const id = req.params.id
    const [book] = await db.select().from(booksTable).where(eq(booksTable.id,id))

    // const [book] = await db.select().from(booksTable).where((table)=>eq(table.id,id))
   
    if(!book){
        return res.status(404).json({error:`The book with following id:${id} is not found`})
    }
    return res.json(book);
};

exports.createBook = async (req,res)=>{
       const{title,description,authorId}= req.body
   if(!title || title === ''){
    return res.status(400).json({error:`Please input the title`})
   }
   const [result] = await db.insert(booksTable)
   .values({
    title,
    description,
    authorId
   }).returning({
    id: booksTable.id
   });

    return res.status(201).json({message:'Your book has been created successfully',id: result.id})
};

exports.deleteBookByID = async function(req,res){
      const id = req.params.id
     const deleteBook = await db.delete(booksTable).where(eq(booksTable.id,id))
     .returning()

    return res.status(201).json({messsge: 'Book successfully deleted'})
};