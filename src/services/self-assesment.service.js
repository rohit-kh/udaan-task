const SelfAssesment = require('../models/self-assesment.model')
const User = require('../models/user.model')
const constants = require('../utils/constants')


const create = async (req) => {
    const selfAssesment = new SelfAssesment({
        ...req.body,
        userId: req.user._id
    })
    await selfAssesment.save()
    const riskPercentage = await SelfAssesment.riskPercentage(selfAssesment.userId)
    return riskPercentage
}

const updateCovidResult = async (req) => {
    let userData  = await SelfAssesment.findOne({"userId": req.body.userId})
    if(!userData){
        throw new Error('Resource not found!')
    }
    userData.result = req.body.result;
    await userData.save();
    return {
        "updated": true
    }
}


const zoneInfo = async (req) => {
    const users = await User.find({pinCode: req.body.pinCode})
    const ids = users.map((el) => el._id)
    let userData  = await SelfAssesment.find({"userId": { $in : ids }, result: constants.POSITIVE })
    let zoneType = 'GREEN'
    if(userData.length >= 5 ){
        zoneType = "RED"
    } else if(userData.length < 5) {
        zoneType = "ORANGE"
    }

    return { 
        "numCases": userData.length,
        "zoneType": zoneType
    }
}


module.exports = {
    create,
    updateCovidResult,
    zoneInfo
}