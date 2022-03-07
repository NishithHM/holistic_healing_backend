const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		trim:true,
		unique:true
	},
	price:{
		type:Number,
		required:true,
	},
	details:{
		type:String,
		required:true,
	},
	
})
module.exports = mongoose.model('services',serviceSchema)