const mongoose = require('mongoose')
const constants = require('../utils/constants')

const selfAssesmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    symptoms: [
        {
            type: String,
            required: true,
            enum: [constants.FEVER, constants.COLD, constants.COUGH]
        }
    ],
    travelHistory: {
        type: Boolean,
        require: true
    },
    contactWithCovidPatient: {
        type: Boolean,
        require: true
    },
    result: {
        type: String,
        default: constants.NEGETIVE,
        enum: [constants.POSITIVE, constants.NEGETIVE]
    }
},
{
    timestamps: true
})

selfAssesmentSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject 
}

selfAssesmentSchema.statics.riskPercentage = async (userId) => {
    const selfAssesment = await SelfAssesment.findOne({ userId })

    if(selfAssesment.symptoms.length > 2  && 
        (selfAssesment.contactWithCovidPatient === true ||
            selfAssesment.travelHistory === true
        )
    ){
        return {"riskPercentage": 95}
    } else if (
        selfAssesment.symptoms.length === 2  && 
        (selfAssesment.contactWithCovidPatient === true ||
            selfAssesment.travelHistory === true
        )
    ){
        return {"riskPercentage": 75}
    }else if (
        selfAssesment.symptoms.length === 1  && 
        (selfAssesment.contactWithCovidPatient === true ||
            selfAssesment.travelHistory === true
        )
    ){
        return {"riskPercentage": 50}
    }else{
        return {"riskPercentage": 50}

    }
}



const SelfAssesment = mongoose.model('SelfAssesment', selfAssesmentSchema)

module.exports = SelfAssesment