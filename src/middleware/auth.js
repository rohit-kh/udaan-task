const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const {error} = require('../utils/response-api')

const auth = async (req, res, next) => {
    try{
        if(['/users/login', '/users'].includes(req._parsedUrl.pathname)){
            return next()
        }
        if(req.header('Authorization') === undefined){
            throw new Error('Unauthorized')
        }
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        console.log(decoded, token);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token })
        if(!user){
            throw new Error('Unauthorized')
        }

        req.token = token
        req.user = user
        next()
    }catch (e){
        res.status(401).send(error(e.message))
    }
}


module.exports = auth