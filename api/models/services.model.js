const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// const timeSlotSchema = new mongoose.Schema({
// 	begin:{
// 		type: String,
// 		required:true,
// 		trim:true
// 	},
// 	end:{
// 		type:String,
// 		required:true,
// 		trim:true
// 	}
// })

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
		type: ObjectId,
		trim: true,
	},
	createdBy: {
		type: ObjectId,
		trim: true,
	},
	appointment:{
		date:{
			type:Date,
		},
		timeSlots:[{
			begin:{
				type: String,
				trim: true,
				required: true
			},
			end:{
				type: String,
				trim: true,
				required: true
			}
		}],
		maxAppointmentPerSlot:{
			type:Number,
			trim:true,
		}
	}

}, {timestamps:true})
module.exports = mongoose.model('services', serviceSchema)