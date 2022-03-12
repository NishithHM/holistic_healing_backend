const Ledgers = require('../models/leger.model')
const Services = require('../models/services.model')
const dayjs = require('dayjs');

async function isBooked(date, begin, end, serviceID) {
    const bookedSlots = await Ledgers.count(
        {
            date: date,
            timings: {
                begin: begin,
                end:end
            },
            serviceID:serviceID
        })
    const service = await Services.findOne({serviceID:serviceID})
    console.log(service.maxAppointmentPerSlot)
    console.log(bookedSlots)
    return false;
}

exports.bookTheSlot = async (req, res) => {
    try {
        var ledger = new Ledgers(req.body);
        let date = new Date();
        if (ledger.date == null) {
            ledger.date = dayjs();
        }
        ledger.userId = req.user._id;
        if (isBooked(ledger.date, ledger.timings.begin, ledger.timings.end, ledger.serviceID)) {
          //  res.status(403).send("Already booked ny someone else")
        }
        await ledger.save();
        res.status(201).send("booked successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}