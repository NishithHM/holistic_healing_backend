const dayjs = require('dayjs');
const HolidayList = require('../models/holiday.model');
const Ledgers = require('../models/leger.model')

exports.updateLedgerOnHoliday = async (req, res) => {
    try {
        console.log(req.body.date)
        const holidayList = new HolidayList({date:req.body.date})
        console.log(holidayList)
        await holidayList.save();
        const dayStart = dayjs(req.body.date).format('YYYY-MM-DD HH:mm:ss');
        const dayEnd = dayjs(dayStart).add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
        const ledger = await Ledgers.find({
            startTime: {
                $gte: dayStart,
                $lt: dayEnd
            }
        });
        //console.log(ledger);
        ledger.forEach(async ledger => {
            ledger.isBooked = false;
            await ledger.save()
        })
        res.status(201).send("Updated Ledgers Successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
