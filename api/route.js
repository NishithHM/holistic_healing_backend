const express = require('express');
const router = express.Router();
const userHandler = require('./controllers/user.controller');
const serviceHandler = require('./controllers/service.controller')
// user
router.post('/api/create/user', userHandler.register)
router.post('/api/signIn/user',userHandler.signIn)
router.get('/api/user',userHandler.checkAuth, userHandler.getUser)

// services
router.post('/api/create/service',serviceHandler.createService)
router.patch('/api/update/service/:serviceId',serviceHandler.updateService)
router.get('/api/get/service',serviceHandler.getServices)
module.exports = router