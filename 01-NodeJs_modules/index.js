const fs = require('node:fs')

const content = fs.readFileSync('notes.txt','utf-8')

// fs.writeFileSync('copy.txt',content,'utf-8')//this will over-ride the contents 
fs.appendFileSync('copy.txt',content,'utf-8')//this will keep on appending the content 

// fs.mkdirSync('games')


fs.mkdirSync('games/valorant/skins',{recursive:true})//this will be creating multiple folders

// fs.rmdirSync('games/valorant/skins');

fs.rmdirSync('games/valorant');