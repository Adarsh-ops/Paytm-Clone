const { JWT_SECRET } = require('./config.js');
const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        return res.status(404).json({})
    }
    const token=authHeader.split(' ')[1];
    try{
        const decodedInfo=jwt.verify(token,JWT_SECRET);
        req.userId=decodedInfo.userId;
        next();
    }catch(err){
        return res.status(403).json({})
    }
}

module.exports={
    authMiddleware
}

