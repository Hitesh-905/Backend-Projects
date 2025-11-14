import express from 'express';
import db from '../db/index.js';
import { usersTable,userSession } from '../db/schema.js';
import { randomBytes, createHmac } from 'node:crypto';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.get('/', async function (req, res) {
   const sessionID = req.headers['session-Id']
   if(!sessionID){
    return res.status(404).json({error:`You are not logged in `})
   }

   const [data] = await db.select({
    id:userSession.id,
    userId:userSession.userId,
    name:usersTable.name,
    email:usersTable.email,
   }).from(userSession)
   .rightJoin(usersTable,eq(usersTable.id,userSession.userId))
   .where((table)=>eq(table.id,sessionID))

   if(!data){
    return res.status(404).json({error:`You are not logged in `})
   }
return res.json({data});
});

router.post('/signup', async (req, res) => {
   
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const [existingUser] = await db
            .select({
                email: usersTable.email,
            })
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (existingUser) {
            return res.status(400).json({ message: `${email} already exists` }); 
        }

        const salt = randomBytes(32).toString('hex');
        const hashedPassword = createHmac('sha256', salt)
            .update(password)
            .digest('hex');

        const [user] = await db
            .insert(usersTable)
            .values({
                name,
                email,
                password: hashedPassword,
                salt,
            })
            .returning({
                id: usersTable.id,
            });

        return res.status(201).json({ status: 'success', data: { userId: user.id } });

    } catch (error) {
        console.error("Error in /signup route:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login',async(req,res)=>{
     const {email, password } = req.body;

      if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }

      const [existingUser] = await db
            .select({
                id:usersTable.id,
                email: usersTable.email,
                salt:usersTable.salt,
                password : usersTable.password
            })
            .from(usersTable)
            .where(eq(usersTable.email, email));
    
      if (!existingUser) {
            return res.status(400).json({ message: `${email} does not exists` }); 
        }

    const salt = existingUser.salt
    const existinghash = existingUser.password

    const newHash = createHmac('sha256', salt)
            .update(password)
            .digest('hex');
    if(newHash !== existinghash){
        return res.status(400).json({error:'Incorrect password'})
    }

    const [session] = await db.insert(userSession).values({
        userId:existingUser.id
    }).returning({id:userSession.id})
    return res.status(201).json({Status:'success',sessionId:session.id})
})

export default router;




/*
router.post('/signup',async (req,res)=>{
    const {name,email,password} = req.body

    const [existingUser] = await db.select({
        usersEmail : usersTable.email
    }).from(usersTable).where(eq(usersTable.email,email))

    if(existingUser){
        return res.status(400).json({error:`Email already exists`})
    }

     const salt = randomBytes(32).toString('hex');
     const hashedPassword = createHmac('sha256', salt)
            .update(password)
            .digest('hex');
    const newUser = await db.insert(usersTable).values({
        name,
        email,
        password:hashedPassword,
        salt,
    }).returning({
       id:usersTable.id
    })
    return res.json({message:`Account created succesfuuly`,id:newUser.id})
})*/



//login route pratice with creating a session for logeed in user
// route.post('/login',async ()=>{
//     const {email,password} = req.body

//     const existingUser = await db.select({
//         id:usersTable.id,
//         salt:usersTable.salt,
//         password:usersTable.password,
//         email:usersTable.email
//     }).from(usersTable).where(eq(usersTable.email,email))
    
//     if(!existingUser){
//         return res.status(404).json({error:`email does not exists,please try again with valid email`})
//     }

//     const salt = existingUser.salt
//     const existinghash = existingUser.password

//     const newHash =  createHmac('sha256', salt)
//             .update(password)
//             .digest('hex');
            



// })
