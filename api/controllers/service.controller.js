const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const Services = require('../models/services.model');
function formatData(data) {
	const service = new Services()
	const { maxAppointmentPerSlot, date, timeRange, sessionTimings, price, details, name } = data.body
	service.price = price;
	service.details = details;
	service.name = name;
	service.updatedBy = data.user._id;
	service.isActive = true;
	service.appointment.maxAppointmentPerSlot = maxAppointmentPerSlot;
	service.appointment.date = date;
	const [startTime, endTime] = timeRange
	const startTimeFormatted = dayjs(`${dayjs().format('YYYY-MM-DD')} ${startTime}`, 'HH:mm')
	const endTimeFormatted = dayjs(`${dayjs().format('YYYY-MM-DD')} ${endTime}`, 'HH:mm')
	
	const slots = [];
	let pointerTime = startTimeFormatted;
	while (endTimeFormatted.diff(pointerTime, 'minutes') > 0) {
		const endPointer = pointerTime.add(sessionTimings, 'minutes')
		const slot = {
			begin: pointerTime.format('HH:mm'),
			end: endPointer.format('HH:mm')
			// begin: dayjs(dayjs.utc(pointerTime)).format('HH:mm'),
			// end: dayjs(dayjs.utc(endPointer)).format('HH:mm')
		}
		
		slots.push(slot)
		pointerTime = endPointer;
	}
	console.log(slots)
	service.appointment.timeSlots = slots;
	return service;
}

exports.createService = async (req, res) => {
	try {
		const service = formatData(req);
		service.createdBy = req.user._id;
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
		const service = formatData(req);
		await Services.findByIdAndUpdate(serviceId, service)
		res.status(500).send({ "msg": "Updated Successfully", "_id": service._id })
	} catch (error) {
		console.log(error)
		res.status(500).send('cannot update service')
	}
}
exports.getServices = async (req, res) => {
	try {
		const service = await Services.find({isActive:true});
		res.status(201).send(service)

	} catch (error) {
		console.log(error)
		res.status(500).send('cannot Retrive Service')
	}
}
exports.deleteServiceById = async (req, res) => {
	const serviceId = req.params.serviceId;
	try {
		const data = await Services.findById(serviceId)
		data.updatedBy = req.user._id;
		data.isActive = false
		await Services.findByIdAndUpdate(serviceId, data);
		res.status(201).send("Deleted Successfully")
	} catch (error) {
		res.status(500).send(error)
	}
}