const express = require('express')
const userController = require('../controller/user.controller')
const constants = require('../utils/constants')
const router = new express.Router()

router.post('/', userController.create)

router.post('/login', userController.login)


module.exports = router