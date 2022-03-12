const Services = require('../models/services.model');

exports.createService = async (req, res) => {
	try {
		const service = new Services(req.body)
		service.updatedBy = req.user._id;
		//console.log(req.user)
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
		Services.findByIdAndUpdate(serviceId, req.params.body);
		res.status(201).send("Deleted Successfully")
	} catch (error) {
		res.status(500).send(error)
	}
}