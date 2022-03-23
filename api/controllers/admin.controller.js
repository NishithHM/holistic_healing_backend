// display list of services on INPUT DATE -> display number of booking for all the slots

//admin will get all infos about who booked,slotTimings,serviceName,
const User = require('../models/user.model')
const LedgerHandler = require('../controllers/ledger.controller')
const Ledgers = require('../models/leger.model')




exports.adminStats = async (req, res) => {
	// testing Phase
	

	var queryObj;
	if(req.body.userId!= null){
		queryObj = {userId:req.body.userId}
	}
	queryObj+={isBooked:true}
	console.log(queryObj)
	const ledger = await Ledgers.find( queryObj );
	console.log(ledger)
	res.status(201).send(ledger)
	//upload.single('Image')
	// const image = req.file;
	// console.log(image)
}



