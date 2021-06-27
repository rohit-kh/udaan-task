const User = require('../models/user.model')
const constants = require('../utils/constants')


const create = async (req) => {
    const user = new User({
        ...req.body
    })
    return await user.save()
}

const login = async (req) => {
    const user = await User.findByCredentials(req.body.phoneNumber, req.body.password)
	const token = await user.generateAuthToken()
	return {user, token}
}

module.exports = {
    create,
    login
}