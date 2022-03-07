const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:admin123@cluster0.t2cxv.mongodb.net/patient_mgmt?retryWrites=true&w=majority";
const connect = mongoose.connect(uri, ()=>{
	console.log('connected')
})

module.exports = connect;