const dayjs = require('dayjs');
const HolidayList = require('../models/holiday.model');
const Ledgers = require('../models/leger.model')

exports.updateLedgerOnHoliday = async (req, res) => {
    try {
        const holidayList = new HolidayList({date:req.body.date})
        await holidayList.save();
        const dayStart = dayjs(req.body.date).format('YYYY-MM-DD HH:mm:ss');
        const dayEnd = dayjs(dayStart).add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
        const ledger = await Ledgers.find({
            startTime: {
                $gte: dayStart,
                $lt: dayEnd
            }
        });
        for(var i=0;i<ledger.length;i++){
            ledger[i].isBooked = false;
            await ledger[i].save()
        }
        res.status(201).send("Updated Ledgers Successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
