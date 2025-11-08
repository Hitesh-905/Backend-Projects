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
async function practiceCrudTwo (){
        const hitesh  = await db.select()
        .from(userTable)
        .where(eq(userTable.email,"hitesh@example.com" ))

        const fullDetails = await db.select()
        .from(userTable)
        .where(and(eq(userTable.email,'hitesh@example.com'),
        eq(userTable.name,'hitesh')
    )
)
};

//BASIC CRUD OPERATIONS PART 3
/*
Query 1: Insert a single new user
INSERT INTO userTable (name,email)
VALUES ('Ram','ram@gmail.com')

Query 2: Insert multiple users at once
INSERT INTO userTable (name,email)
VALUES('sam',;sam@gmail.com),
      ('hitman','hitman@example.com'
*/

async function praticeCrudThree(){
    const singleUser = await db.insert(userTable)
    .values({
        name:'sam',
        email:'sam@gmail.com'
    }).returning();

    const multipleUser = await db.insert(userTable)
    .values([
        {name: 'Hitesh',email:'hitesh@gmail.com'},
        {name: 'Hitesh',email:'hitesh@gmail.com'}
    ])
}