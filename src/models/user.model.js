const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const constants = require('../utils/constants')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10,
        validate(value){
            if(value.toString().length != 10){
                throw new Error('Please enter valid phoneNumber')
            }
        }
    },
    pinCode: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 6,
        validate(value){
            if(value.toString().length != 6){
                throw new Error('Please enter valid pinCode')
            }
        }
    },
    role: {
        type: String,
        required: true,
        default: constants.ADMIN,
        enum: [constants.ADMIN, constants.USER]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{
    timestamps: true
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject 
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign({_id:user._id.toString()}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (phoneNumber, password) => {
 
    const user = await User.findOne({ phoneNumber })
    if (!user) {
        throw new Error('Unable to login 2')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login 1')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user task when user is removed
userSchema.pre('remove', async function(next) {
    const user = this
    await task.deleteMany({ owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User