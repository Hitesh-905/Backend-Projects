const express = require('express')
const router = express.Router()
const controller = require('../controllers/books.controller.js')


router.get('/',controller.homePaage);

router.get('/books',controller.getAllBooks);

router.get('/books/:id',controller.getBookByID);


router.post('/books',controller.createBook);

router.delete('/books/:id',controller.deleteBookByID);

module.exports=router;
