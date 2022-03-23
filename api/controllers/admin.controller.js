// display list of services on INPUT DATE -> display number of booking for all the slots

//admin will get all infos about who booked,slotTimings,serviceName,
const User = require('../models/user.model')
const LedgerHandler = require('../controllers/ledger.controller')
const Ledgers = require('../models/leger.model')

exports.adminStats = async (req, res) => {
	// testing Phase
	var queryObj = new Object()
	if (req.body.userId != null) {
		queryObj.userId = req.body.userId;
	}
	if (req.body.serviceId != null) {
		queryObj.serviceId = req.body.serviceId;
	}
	if (req.body.startTime != null) {
		queryObj.startTime = req.body.startTime;
	}
	if (req.body.endTime != null) {
		queryObj.endTime = req.body.endTime;
	}
	if (req.body.isBooked != null) {
		queryObj.isBooked = req.body.isBooked
	}
	if (req.body.bookedBy != null) {
		queryObj.bookedBy = req.body.bookedBy;
	}
	if (req.body.createdAt != null) {
		queryObj.createdAt = req.body.createdAt;
	}
	if (req.body.updatedAt != null) {
		queryObj.updatedAt = req.body.updatedAt;
	}

	// if(req.body. != null){
	// 	queryObj. = req.body.
	// }
	console.log(queryObj)
	try {
		const ledger = await Ledgers.find(queryObj);
		console.log(ledger)
		res.status(201).send(ledger)
	} catch (error) {
		res.status(500).send(error)
	}
}



