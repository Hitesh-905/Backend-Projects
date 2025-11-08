require('dotenv/config')
const express = require('express');
const app = express()
const {loggerMiddleware} = require('./middlewares/logger.js')
const bookRouter = require('./routes/books.routes.js')
const PORT = 8000;

//middleware to parse the request body into json format
app.use(express.json())

//custom middleware
app.use(loggerMiddleware);


//routes
app.use('/',bookRouter);

app.listen(PORT,()=>{
    console.log(`You are listening on PORT:8000`);
});