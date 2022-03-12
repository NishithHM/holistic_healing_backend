const express = require('express');
const router = express.Router();
const userHandler = require('./controllers/user.controller');
const serviceHandler = require('./controllers/service.controller')
const Authentication = require('./controllers/auth.controllers');

// user
router.post('/api/create/user', userHandler.register)
router.post('/api/signIn/user', userHandler.signIn)
router.get('/api/user', Authentication.ensureRole(['superAdmin', 'user', 'admin']), userHandler.getUser)

// services
router.post('/api/create/service', Authentication.ensureRole(['superAdmin']), serviceHandler.createService)
router.patch('/api/update/service/:serviceId', Authentication.ensureRole(['superAdmin']), serviceHandler.updateService)
router.get('/api/get/service/', Authentication.ensureRole(['superAdmin', 'user', 'admin']), serviceHandler.getServices)
router.delete('/api/delete/service/:ServiceId',Authentication.ensureRole(['superAdmin']), serviceHandler.deleteServiceById)

module.exports = router