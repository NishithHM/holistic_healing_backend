const Services = require('../models/services.model');

function formatData(){
	
}

exports.createService = async (req, res) => {
	try {
		const service = new Services(req.body)
		service.createdBy = req.user._id;
		service.isActive = true;
		service.appointment.maxAppointmentPerSlot = req.body.maxAppointmentPerSlot;
		service.appointment.date = req.body.date;

		var begin = req.body.timeRange[0]*60;
		var end = req.body.timeRange[1]*60;
		const numOfSlots = (end - begin) / req.body.sessionTimings;

		for (var i = 0; i < numOfSlots; i++) {
			const timeslot = {
				begin: begin,
				end: begin + req.body.sessionTimings
			}
			begin = begin + req.body.sessionTimings;
			service.appointment.timeslots.push(timeslot)
		}
		console.log(service)

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