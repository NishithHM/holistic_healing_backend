const mongoose = require('mongoose')
const holidaySchema = new mongoose.Schema({
    date:{
        type:Date
    },
    isActive:{
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model("HolidayList",holidaySchema)