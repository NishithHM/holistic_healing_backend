const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const ledgerSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: ObjectId,
    },
    serviceID: {
        required: true,
        type: ObjectId,
    },
    date: {
        type: Date,
        required: true,
    },
    timings:{
        begin: {
            type: String,
            required: true,
            trim: true
        },
        end: {
            type: String,
            required: true,
            trim: true
        }
    },
    

},{timestamps:true})

//ledgerSchema.index({serviceID:1,date:1,timings:1,userId:1},{unique:true})

module.exports = mongoose.model("Ledger",ledgerSchema);