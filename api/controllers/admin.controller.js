// display list of services on INPUT DATE -> display number of booking for all the slots

//admin will get all infos about who booked,slotTimings,,serviceName,
const User = require('../models/user.model')

exports.getUserByPhone = async (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    console.log(phoneNumber)
	try {
		const user = await User.findOne({
			phoneNumber
		})
		if (user) {
			res.status(201).json(user)
		} else {
			res.status(204).send('Not Yet Registered')
		}
	} catch (error) {
		res.status(401).send(error)
	}
}


exports.bookByAdmin = async (req,res)=>{

}