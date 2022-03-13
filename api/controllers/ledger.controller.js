const Ledgers = require('../models/leger.model')
const Services = require('../models/services.model')
const dayjs = require('dayjs');
const { isEqual } = require('lodash');

async function isBooked({date, startTime, endTime, serviceID}) {
    const bookedSlots = await Ledgers.count(
        {
            date,
            startTime,
			endTime,
            serviceID,
        })
    const service = await Services.findOne({serviceID:serviceID })
	const startTimeVal = dayjs(startTime, 'YYYY-MM-DD HH:mm').format('HH:mm')
	const endTimeVal = dayjs(endTime, 'YYYY-MM-DD HH:mm').format('HH:mm')
	const requestedSlot = {begin:startTimeVal, end:endTimeVal}
	const slots= service?.appointment?.timeSlots
	const trimmedSlot = slots.map(ele=> {
		const {begin, end} = ele
		return {begin, end}
	})
	const isInValidSlot = !trimmedSlot.some(ele=> isEqual(ele, requestedSlot))
    return bookedSlots >= service.appointment.maxAppointmentPerSlot || isInValidSlot
}

exports.bookTheSlot = async (req, res) => {
    try {
        const ledger = new Ledgers(req.body);
        ledger.userId = req.user._id;
        if (await isBooked(req.body)) {
           res.status(403).send("Selected slot not available")
        }else{
        await ledger.save();
        res.status(201).send("booked successfully")
		}
    } catch (error) {
        // console.log(error)
        res.status(500).send(error)
    }

}