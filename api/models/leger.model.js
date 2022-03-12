const { ObjectID } = require('bson')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    userID:{
        required:true,
        type:ObjectId,
    },
    serviceID:{
        required:true,
        type:ObjectID,
    },
    timings:{
        
    }
})