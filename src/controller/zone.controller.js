const selfAssesmentService = require('../services/self-assesment.service')
const {success, error} = require('../utils/response-api')

const zoneInfo = async (req, res) => {
	try{
        const zoneInfo = await selfAssesmentService.zoneInfo(req)
		return res.status(201).send(success(zoneInfo))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

module.exports = {
    zoneInfo
}