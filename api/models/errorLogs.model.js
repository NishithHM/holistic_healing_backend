const mongoose = require('mongoose')
const errorSchema = new mongoose.Schema({
    Message:{
        type:String,
    },
    userId:{
        type:ObjectId,
        required:true,
    },
    location:{
        type:String,
    }
},{timestamps:true})