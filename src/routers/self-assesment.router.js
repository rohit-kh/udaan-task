const express = require('express')
const selfAssessmentController = require('../controller/self-assesment.controller')
const constants = require('../utils/constants')
const {permit} = require('../middleware/authorization')
const router = new express.Router()


router.post('/self-assesment', selfAssessmentController.create)

router.patch('/update-covid-result', permit(constants.ADMIN), selfAssessmentController.updateCovidResult)

module.exports = router