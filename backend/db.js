const mongoose=require('mongoose')
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
})

const AccountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    balance:{
        type:Number,
        required:true
    }
})

const User=mongoose.model('User',UserSchema);
const Account=mongoose.model('Account',AccountSchema);

module.exports={
    User, Account
}