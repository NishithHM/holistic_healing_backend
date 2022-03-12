const dayjs = require('dayjs');
const Services = require('../models/services.model');

exports.createService = async (req, res) => {
	try {
		const service = new Services(req.body)
		const {maxAppointmentPerSlot, date, timeRange, sessionTimings} =req.body
		service.createdBy = req.user._id;
		service.isActive = true;
		service.appointment.maxAppointmentPerSlot = maxAppointmentPerSlot;
		service.appointment.date = date;
		const [startTime, endTime] = timeRange
		const startTimeFormatted = dayjs(`${dayjs().format('YYYY-MM-DD')} ${startTime}`, 'HH:mm')
		const endTimeFormatted = dayjs(`${dayjs().format('YYYY-MM-DD')} ${endTime}`, 'HH:mm')
		const slots = [];
		let pointerTime = startTimeFormatted;
		while(endTimeFormatted.diff(pointerTime, 'minutes') >0){
			const endPointer = pointerTime.add(sessionTimings, 'minutes')
			const slot = {
				begin: pointerTime.format('HH:mm'),
				end: endPointer.format('HH:mm')
			}
			slots.push(slot)
			pointerTime = endPointer;
		}
		service.appointment.timeSlots = slots;
		await service.save();
		res.status(201).send({ "msg": "Saved Successfully", "_id": service._id })
	} catch (error) {
		console.log(error)
		res.status(500).send('cannot create service')
	}
}
exports.updateService = async (req, res) => {
	const serviceId = req.params.serviceId
	try {
		var service = req.body;
		service.updatedBy = req.user._id;
		service.isActive = true;
		await Services.findByIdAndUpdate(serviceId, service)
		res.status(500).send("updated successfully")
	} catch (error) {
		console.log(error)
		res.status(500).send('cannot update service')
	}
}
exports.getServices = async (req, res) => {

	try {
		const service = await Services.find();
		res.status(201).send(service)

	} catch (error) {
		console.log(error)
		res.status(500).send('cannot retrive service')
	}
}
exports.deleteServiceById = async (req, res) => {
	const serviceId = req.params.serviceId;
	try {
		const data = await findOne({ _id: serviceId })
		service.updatedBy = req.user._id;
		data.isActive = false
		Services.findByIdAndUpdate(serviceId, data);
		res.status(201).send("Deleted Successfully")
	} catch (error) {
		res.status(500).send(error)
	}
}