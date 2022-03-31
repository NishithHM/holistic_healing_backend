const express = require('express');
const router = express.Router();
const userHandler = require('./controllers/user.controller');
const serviceHandler = require('./controllers/service.controller')
const authentication = require('./controllers/auth.controllers');
const LedgerHandler = require('./controllers/ledger.controller')
const holidayHandler = require('./controllers/holiday.controller');
const adminHandler = require('./controllers/admin.controller');

const multer = require('multer');
const path = require('path')

const fileStorageEngine = multer.diskStorage({
	destination:(req,file,cb) =>{
		cb(null,path.join(__dirname,'./uploads'))

	},
	filename:(req,file,cb)=>{
		cb(null,Date.now() + path.extname(file.originalname))

	}
})
const upload = multer({storage:fileStorageEngine})
    

// user
router.post('/api/create/user', userHandler.register)
router.post('/api/signIn/user', userHandler.signIn)
router.get('/api/user', authentication.ensureRole(['superAdmin', 'user', 'admin']), userHandler.getUser)
router.get('/api/get/user/:phoneNumber',authentication.ensureRole(['superAdmin','admin']),userHandler.getUserByPhone)


// services
router.post('/api/create/service', authentication.ensureRole(['superAdmin']),serviceHandler.createService)
router.patch('/api/update/service/:serviceId', authentication.ensureRole(['superAdmin']), serviceHandler.updateService)
router.get('/api/get/service/', authentication.ensureRole(['superAdmin', 'user', 'admin']), serviceHandler.getServices)
router.delete('/api/delete/service/:serviceId',authentication.ensureRole(['superAdmin']), serviceHandler.deleteServiceById)

//Booking 
router.post('/api/create/booking/',authentication.ensureRole(['user','admin']),LedgerHandler.bookTheSlot);
router.get('/api/get/availableSlots', authentication.ensureRole(['superAdmin', 'user', 'admin']), LedgerHandler.getAvailableSlots)
router.delete('/api/delete/cancelSlot',authentication.ensureRole(['user','admin']),LedgerHandler.CancelSlot)

//Holiday
router.post('/api/create/holiday',authentication.ensureRole(['superAdmin']),holidayHandler.updateLedgerOnHoliday)
router.get('/api/get/holidayList',authentication.ensureRole(['superAdmin', 'user', 'admin']),holidayHandler.getHoliday)

//Admin
router.post('/api/get/adminStats',authentication.ensureRole(['superAdmin','admin']),adminHandler.adminStats)


router.post('/api/temp',upload.single('image'),function(req,res){
res.status(201).send(req.file)

})

module.exports = router