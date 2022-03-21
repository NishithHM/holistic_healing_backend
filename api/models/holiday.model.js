const mongoose = require('mongoose')
const holidaySchema = new mongoose.Schema({
    date:{
        type:Date,
        unique:true,
    },
    isActive:{
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model("HolidayList",holidaySchema)