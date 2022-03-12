const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
	begin:{
		type:Number,
		required:true,
		trim:true
	},
	end:{
		type:Number,
		required:true,
		trim:true
	}
})

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
	appointment:{
		date:{
			type:Date,
		},
		timeslots:[{
			type:timeslotSchema,
			required:true,
		}],
		maxAppointmentPerSlot:{
			type:Number,
			trim:true,
		}
	}

}, {timestamps:true})
module.exports = mongoose.model('services', serviceSchema)