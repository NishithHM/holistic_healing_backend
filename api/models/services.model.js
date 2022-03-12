const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	price: {
		type: Number,
		required: true,
	},
	isActive:{
		type: Boolean,
	},
	details: {
		type: String,
		required: true,
	},
	updatedBy: {
		type: String,
		trim: true,
	},
	createdBy: {
		type: String,
		trim: true,
	},

}, {timestamps:true})
module.exports = mongoose.model('services', serviceSchema)