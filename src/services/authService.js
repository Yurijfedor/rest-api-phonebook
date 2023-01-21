const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { set } = require('mongoose')

const { User } = require('../db/userModel')
const { NotAuthorizedError, EmailInUseError } = require('../helpers/errors')


const registration = async (email, password) => {
    const checEmail = await User.findOne({ email })
    if (checEmail) {
        throw new EmailInUseError(`Email in use`)
    }
    
    const user = new User({ email, password })
    await user.save()
    const savedUser = await User.findOne({email}).select({email: 1, subscription: 1, _id: 0 })
    return savedUser
}

const login = async (email, password) => {
    const user = await User.findOne({ email })
    
    if (!user) {
        throw new NotAuthorizedError(`no user with email: '${email}' found`)
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError('Wrong password')
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET)

    await User.findOneAndUpdate({email}, {$set: {token}})

    const loggedInUser = {
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    }
    return loggedInUser
}

const logout = async (userId, token) => {
    const user = await User.findOne( {_id: userId} )
    if (!user || token !== user.token) {
        throw new NotAuthorizedError("Not authorized")
    }
    await User.findOneAndUpdate({ _id: userId }, { $set: { token: null } })
}

const current = async (userId) => {
    const user = await User.findOne( {_id: userId} ).select({email: 1, subscription: 1, _id: 0 })
    if (!user) {
        throw new NotAuthorizedError("Not authorized")
    }
    return user
}

const changeSubscription = async (subscription, userId) => {
    const changedSubscription = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { subscription: subscription } },
    { new: true }
    )
  if (!changedSubscription) {
    throw new NotAuthorizedError("Not authorized")
  }
  return changedSubscription
}

module.exports = {
    registration,
    login,
    logout,
    current,
    changeSubscription
}