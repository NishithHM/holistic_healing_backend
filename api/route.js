const express = require('express');
const router = express.Router();
const userHandler = require('./controllers/user.controller');
const serviceHandler = require('./controllers/service.controller')
const authentication = require('./controllers/auth.controllers');
const LedgerHandler = require('./controllers/ledger.controller')
const holidayHandler = require('./controllers/holiday.controller');
const adminHandler = require('./controllers/admin.controller')


// user
router.post('/api/create/user', userHandler.register)
router.post('/api/signIn/user', userHandler.signIn)
router.get('/api/user', authentication.ensureRole(['superAdmin', 'user', 'admin']), userHandler.getUser)

// services
router.post('/api/create/service', authentication.ensureRole(['superAdmin']), serviceHandler.createService)
router.patch('/api/update/service/:serviceId', authentication.ensureRole(['superAdmin']), serviceHandler.updateService)
router.get('/api/get/service/', authentication.ensureRole(['superAdmin', 'user', 'admin']), serviceHandler.getServices)
router.delete('/api/delete/service/:serviceId',authentication.ensureRole(['superAdmin']), serviceHandler.deleteServiceById)

//Booking 
router.post('/api/create/booking/:phoneNumber',authentication.ensureRole(['user','admin']),LedgerHandler.bookTheSlot);
router.get('/api/get/availableSlots', authentication.ensureRole(['superAdmin', 'user', 'admin']), LedgerHandler.getAvailableSlots)

//UpdateHoliday
router.post('/api/create/holiday',authentication.ensureRole(['superAdmin']),holidayHandler.updateLedgerOnHoliday)

//Admin
router.get('/api/get/user/:phoneNumber',authentication.ensureRole(['superAdmin','admin']),adminHandler.getUserByPhone)

module.exports = router