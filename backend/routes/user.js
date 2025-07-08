const express=require('express');
const router=express.Router();
const zod=require('zod');
const {User, Account}=require('../db')
const { JWT_SECRET } = require('../config.js')
const jwt=require('jsonwebtoken')
const {authMiddleware}=require('../middlewares')


const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(8),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post('/signup',async (req,res)=>{
     const {success}=signupSchema.safeParse(req.body);
     if(!success){
        return res.status(411).json({
            message:'Incorrect details filled'
        })
     }
     const existingUser=await User.findOne({username:req.body.username})
     if(existingUser){
        return res.status(411).json({
            message:'Email already taken!'
        })
     }
     const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
     const userId=user._id;
     await Account.create({
        userId,
        balance:1+Math.random()*1000
     })
     const token=jwt.sign({userId},JWT_SECRET)
     res.status(200).json({
        message:'User created successfully',
        token:token
     })
})

const signinSchema=zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})

router.post('/signin', async (req,res)=>{
    const body=req.body;
    const {success}=signinSchema.safeParse(body);
     if(!success){
        return res.status(411).json({
            message:'Incorrect details filled'
        })
     }
     const user=await User.findOne({
        username:body.username,
        password:body.password
     });
     if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);
        return res.status(200).json({
            message:'User signed in successfully',
            token:token
        })
     }
     return res.status(411).json({
        message:'User not found in database'
     })
})

const updateSchema=zod.object({
    password:zod.string().min(8).optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.put('/',authMiddleware,async (req,res)=>{
    const userId=req.userId;

    const {success}=updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:'Invalid Inputs!'
        })
    }

    const user=await User.updateOne({
        _id:userId
    
    },{
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })
    res.status(200).json({
        message:'User updated successfully!'
    })
})

router.get('/bulk', authMiddleware, async (req,res)=>{
    const filter=req.query.filter||"";

    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
         lastName:{
            "$regex":filter
         }   
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

router.get('/getName',authMiddleware,async (req,res)=>{
    const userId=req.userId;

    const user=await User.findOne({
        _id:userId
    });
    if(user){
        res.json({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        })
    }
})



module.exports=router;