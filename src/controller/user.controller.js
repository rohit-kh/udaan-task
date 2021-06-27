const userService = require('../services/user.service')
const {success, error} = require('../utils/response-api')

const create = async (req, res) => {
	try{
        const user = await userService.create(req)
		return res.status(201).send(success(user))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const login = async (req, res) => {
	try{
        const data = await userService.login(req)
		return res.status(200).send(success(data))
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

module.exports = {
    create,
    login
}