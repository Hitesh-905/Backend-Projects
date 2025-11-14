import db from './db/index.js';
import { usersTable,userSession } from './db/schema.js';
import { eq } from 'drizzle-orm';
import express from 'express';
import userRouter from './routes/user.routes.js'
const app = express()
const PORT = process.env.PORT ?? 8000;


app.use(express.json())//default middleware for json request
app.use(async function(req,res,next){
 const sessionId = req.headers['session-Id']
 if(!sessionID){
    return next();
 }
  const [data] = await db.select({
    sessionId:userSession.id,
    id:usersTable.id,
    userId:userSession.userId,
    name:usersTable.name,
    email:usersTable.email,
   }).from(userSession)
   .rightJoin(usersTable,eq(usersTable.id,userSession.userId))
   .where((table)=>eq(table.sessionId,sessionId))
   if(!data){
    return next();}

    req.user=data;
    next();
})

app.get('/',(req,res)=>{
    return res.status(200).json(`Server is Up and running`)
});

app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`You are listening on PORT: ${PORT}`);
});