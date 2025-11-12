const express = require('express')
const router = express.Router()
const authorsTable = require('../models/author.model.js')
const booksTable = require('../models/book.model.js')
const db = require('../db');
const {eq} = require('drizzle-orm')

router.get('/authors',async(req,res)=>{
    const authors = await db.select().from(authorsTable)
    return res.json(authors)

})


//get author by id 
router.get('/authors/:id',async(req,res)=>{
    const id = req.params.id

    const [author]  = await db.select().from(authorsTable).where(eq(authorsTable.id,id))

    if(!author){
        res.status(404).json({error:`Author with id: ${id} not found`})
    }

    return res.json(author)
})
//Post request - Create a author in authorsTable 
router.post('/authors',async(req,res)=>{
    const {firstName,lastName,email} = req.body;

    const [createAuthor] = await db.insert(authorsTable).values({
        firstName,
        lastName,
        email,
    }).returning({
        id: authorsTable.id
    })
    return res.status(201).json({message:`Author Created Successfully`,id:createAuthor.id})
});

//get request for all the books for an author
//id here is authorid
router.get('/authors/:id/books',async(req,res)=>{
    const id = req.params.id

    const books = await db.select().from(booksTable).where(eq(booksTable.authorId,id))
    return res.json(books)
})
module.exports= router;