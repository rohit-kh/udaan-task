const express = require('express')
const zoneController = require('../controller/zone.controller')
const constants = require('../utils/constants')
const {permit} = require('../middleware/authorization')
const router = new express.Router()


router.get('/zone-info', permit(constants.ADMIN), zoneController.zoneInfo)

module.exports = router