const express = require('express');
const router = express.Router();
const userHandler = require('./controllers/user.controller');
const serviceHandler = require('./controllers/service.controller')
const authHandler = require('./controllers/auth.controllers')
// user
router.post('/api/create/user', userHandler.register)
router.post('/api/signIn/user', userHandler.signIn)
router.get('/api/user', authHandler.authUser, userHandler.getUser)

// services
router.post('/api/create/service', authHandler.authAdmin, serviceHandler.createService)
router.patch('/api/update/service/:serviceId', authHandler.authAdmin, serviceHandler.updateService)
router.get('/api/get/service/',authHandler.authUser, serviceHandler.getServices)
router.delete('/api/delete/service/:ServiceId',authHandler.authAdmin, serviceHandler.deleteServiceById)
module.exports = router