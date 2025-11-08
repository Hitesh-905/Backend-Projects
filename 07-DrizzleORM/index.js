const dotenv = require('dotenv')
const db = require('./db/index.js')
const {userTable,postTable} = require('./drizzle/schema.js')
dotenv.config()

//query 1 get all the columns from the users table 
//sql - SELECT * FROM userstable

//query 2 get only the name and email from the userstable
//sql - SELECT name,email FROM userstable
async function practice(){
    const allUsers = await db.select().from(userTable)
    console.log(allUsers);
   
    const partialUsers = await db.select({
      userName: userTable.name,
      userEmail: userTable.email
    }).from(userTable)

}
practice();

//CRUD PART 2
/*
query 1 - select the user whose has a email hitesh@example.com
SELECT * FROM usersTable WHERE email = hitesh@example.com

query 2 - select the user whos has name hitesh and email hitesh@example.com
SELECT * FROM usersTable WHERE email = hitesh@example.com AND name = hitesh

*/