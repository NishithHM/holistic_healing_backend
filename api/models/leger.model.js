const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const ledgerSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: ObjectId,
    },
    serviceId: {
        required: true,
        type: ObjectId,
    },
	startTime:{
		type: Date,
	},
	endTime:{
		type: Date
	},
    isBooked:{
        type:Boolean,
        default:true,
    }

},{timestamps:true})

ledgerSchema.index({serviceID:1, startTime:1, endTime:1,userId:1},{unique:true})

module.exports = mongoose.model("Ledger",ledgerSchema);