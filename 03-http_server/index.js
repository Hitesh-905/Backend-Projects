const http = require('http')

const server = http.createServer(function(req,res){
    res.writeHead(200)
    res.end(`Thanks for visiting our website`)

});

server.listen(8000,()=>{
    console.log(`You are listening on the PORT:8000`);
    
});