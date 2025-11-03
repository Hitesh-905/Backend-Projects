import express from 'express'
const router = express.Router();

router.get('/')//return current login user 

router.post('/signup');

router.post('/login');



export default router;