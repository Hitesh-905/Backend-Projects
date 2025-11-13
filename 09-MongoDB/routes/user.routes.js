import express from 'express'
import User from '../models/user.model.js'

const router = express.Router()

router.post('/signup',async(req,res)=>{
    const {name,email,password} = req.body

    const existingUser = await User.findOne({
        email,
    });

    if(existingUser){
        return res.status(400).json({error:`User with email ${email} already exists`})
    }
})
export default router;