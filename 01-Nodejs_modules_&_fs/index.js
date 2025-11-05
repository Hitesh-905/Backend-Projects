const fs = require('node:fs')

const content = fs.readFileSync('notes.txt','utf-8')

console.log(content);
