const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

const Schema=new mongoose.Schema({
    papername:{
        type:String,
        required:true
    },
    assignname:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },

    time:{
        type:Int16Array,
        required:true
    }
})
const Collection=new mongoose.model('Collection',Schema)
module.exports=LogInCollection