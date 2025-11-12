const booksTable = require('../models/book.model.js')
const authorsTable = require('../models/author.model.js')
const db = require('../db');
const {eq} = require('drizzle-orm')
const { sql } = require("drizzle-orm");


exports.homePaage = function(req,res){
    res.end(`Welcome to My Book Store :)`)
}
exports.getAllBooks = async function(req, res) {
    try {
        const search = req.query.search;
        let query = db.select().from(booksTable);
        if (search) {
            query = query.where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);
        }
    
        const books = await query;
        return res.json(books);

    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: "Error fetching books" });
    }
};
 

exports.getBookByID = async function(req,res){
     const id = req.params.id
    const [book] = await db.select()
    .from(booksTable)
    .where(eq(booksTable.id,id))
    .leftJoin(authorsTable,eq(booksTable.authorId,authorsTable.id))

   
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