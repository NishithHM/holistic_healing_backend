const Ledgers = require('../models/leger.model')
const Services = require('../models/services.model')
const dayjs = require('dayjs');
const { isEqual } = require('lodash');

async function isBooked({startTime, endTime, serviceId}) {
   try {
	const bookedSlots = await Ledgers.count(
        {
            startTime,
			endTime,
            serviceId,
        })
    const service = await Services.findById(serviceId)
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
	   
   } catch (error) {
	   return null
   }
}

exports.bookTheSlot = async (req, res) => {
    try {
        const ledger = new Ledgers(req.body);
        ledger.userId = req.body.userId;
		ledger.bookedBy = req.user._id;
        if (await isBooked(req.body)) {
           res.status(403).send("Selected slot not available")
        }else{
        await ledger.save();
        res.status(201).send("booked successfully")
		}
    } catch (error) {
        	 console.log(error)
        res.status(500).send(error)
    }
}

exports.getAvailableSlots = async (req, res)=>{
		const {serviceId, date} = req.query
		console.log(serviceId, date)
		const service = await Services.findById(serviceId)
		if(service){
		const slots = service.appointment.timeSlots
		const trimmedSlot = slots.map(ele=> {
			const {begin, end} = ele
			return {startTime: dayjs(`${date} ${begin}`).format('YYYY-MM-DD HH:mm'),
			 endTime:dayjs(`${date} ${end}`).format('YYYY-MM-DD HH:mm')}
		})
		const availableRes = []
		for(let i=0; i< trimmedSlot.length; i++){
		const bookedCount = await Ledgers.count(trimmedSlot[i])
			availableRes.push({
				...trimmedSlot[i],
				remainingSlots: service?.appointment?.maxAppointmentPerSlot - bookedCount
			})
	   }
	res.json({slots:availableRes, serviceId})
	}else{
		res.json({slots:[], serviceId})
	}
}