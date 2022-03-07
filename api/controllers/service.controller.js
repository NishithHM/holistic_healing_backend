const Services = require('../models/services.model');

exports.createService = async(req,res)=>{
	try {	
		const service = new Services(req.body)
		await service.save();
		res.status(201).send('saved successfully')
	} catch (error) {
		console.log(error)
		res.status(500).send('cannot create service')
	}
}
exports.updateService = async(req,res)=>{
	const serviceId = req.params.serviceId
	try {
		await Services.findOneAndUpdate({_id:serviceId},req.body)
		res.status(500).send("updated successfully")
	} catch (error) {
		console.log(error)
		res.status(500).send('cannot update service')
	}
}
exports.getServices = async(req,res)=>{
	try {
	const service = await Services.find();
		res.status(201).send(service)
		
	} catch (error) {
		console.log(error)
		res.status(500).send('cannot retrive service')
	}
}