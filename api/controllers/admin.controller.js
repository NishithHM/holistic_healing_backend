// display list of services on INPUT DATE -> display number of booking for all the slots

//admin will get all infos about who booked,slotTimings,serviceName,
const User = require('../models/user.model')
const LedgerHandler = require('../controllers/ledger.controller')
const Ledgers = require('../models/leger.model')




exports.adminStats = async (req, res) => {
	// testing Phase
	const userId = "622d63d3a4c8d51fbc654eb6";
	const ledger = await Ledgers.find({ userId });
	console.log(ledger)
	res.status(201).send(ledger)
	//upload.single('Image')
	// const image = req.file;
	// console.log(image)
}



