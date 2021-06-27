const selfAssesmentService = require('../services/self-assesment.service')
const {success, error} = require('../utils/response-api')

const create = async (req, res) => {
	try{
        const result = await selfAssesmentService.create(req)
		return res.status(201).send(success(result))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const updateCovidResult = async (req, res) => {
	try{
        const data = await selfAssesmentService.updateCovidResult(req)
		return res.status(200).send(success(data))
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

module.exports = {
    create,
	updateCovidResult
}