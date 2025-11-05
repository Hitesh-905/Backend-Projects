const fs = require('node:fs')


//synchronous code  - blocking code 
// / content = fs.readFileSync('notes.txt','utf-8') 
// console.log(content);



//asynchrnous code - non blocking code 
fs.readFile('notes.txt','utf-8',function(error,data){
    if(error) console.log(error);
    else console.log('asynchrnously reading succesful\n',data);
})
