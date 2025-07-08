const express=require('express');
const { authMiddleware } = require('../middlewares');
const { User, Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router=express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
    const userId=req.userId;
    const account=await Account.findOne({
        userId:userId
    })
    res.json({
        message:account.balance
    })
})

router.post('/transfer',authMiddleware,async (req,res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const {amount,to}=req.body;
    const sender=await Account.findOne({
        userId:req.userId
    }).session(session);

    if(!amount||amount>sender.balance){
        await session.abortTransaction();
        return res.status(400).json({
            message:'Insufficient Balance!'
        })
    }
    const receiver=await Account.findOne({
        userId:to
    }).session(session)
    if(!receiver){
        await session.abortTransaction();
        return res.status(400).json({
            message:'Invalid user!'
        })
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:
        {
            balance:-amount
        }
    }).session(session)
    await Account.updateOne({
        userId:to
    },{
        $inc:
        {
            balance:amount
        }
    }).session(session)

    //Commit transaction
    await session.commitTransaction();

    res.json({
        message:'Transfer successful'
    })  
})

module.exports=router;