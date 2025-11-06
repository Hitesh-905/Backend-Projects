const http  = require('node:http')

const server = http.createServer((req,res)=>{
    switch(req.url){
        case '/' :
            res.writeHead(200)
            return res.end(`You are on Homepage`)
        case '/contact-us':
            res.writeHead(200)
             return res.end(`You can contact me on hiteshchoudhary@gmail.com`)
        case '/about':
            res.writeHead(200) 
            return res.end(`Trust me ! I am a software enjineer`)
        default:
            res.writeHead(404)
             return res.end(`Error: Not found`)
    }
});


server.listen(8000,()=>{
    console.log(`You are listening on the PORT:8000`);
    
});