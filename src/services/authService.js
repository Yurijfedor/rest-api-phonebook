const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { set } = require('mongoose')

const { User } = require('../db/userModel')
const { NotAuthorizedError, EmailInUseError, UpdatedFavoriteStatusError, ValidationError } = require('../helpers/errors')
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async (email, password, avatarURL, verificationToken) => {
    const checEmail = await User.findOne({ email })
    if (checEmail) {
        throw new EmailInUseError(`Email in use`)
    }
    
    const user = new User({ email, password, avatarURL, verificationToken })
    await user.save()

    const msg = {
        to: email,
        from: 'yuriyfedor178@meta.ua', 
        subject: 'Thank you for registration',
        text: `Please, confirm your email address GET http://localhost:3000/api/auth/users/verify/${verificationToken}`,
        html: `<a href='http://localhost:3000/api/auth/users/verify/${verificationToken}'> Please, confirm your email address GET </a>`,
    };
    await sgMail.send(msg)
    
    const savedUser = await User.findOne({email}).select({email: 1, subscription: 1, verificationToken: 1, _id: 0 })
    return savedUser
}

const verification = async (verificationToken) => {
    const user = await User.findOneAndUpdate({verificationToken, verify: false}, {$set: {verificationToken: null, verify: true}})
   
    if (!user) {
        throw new UpdatedFavoriteStatusError(`User not found`)
    }
    await user.save()
    const msg = {
        to: user.email,
        from: 'yuriyfedor178@meta.ua', 
        subject: 'Thank you for registration',
        text: `Your email is confirmed!`,
        html: `Your email is confirmed!`,
    };
    await sgMail.send(msg)
   
}

const resendVerification = async (email) => {
    const user = await User.findOne({ email, verify: false })
   
    if (!user) {
        throw new ValidationError(`Verification has already been passed`)
    }
    
    const msg = {
        to: user.email,
        from: 'yuriyfedor178@meta.ua', 
        subject: 'Thank you for registration',
        text: `Please, confirm your email address GET http://localhost:3000/api/auth/users/verify/${user.verificationToken}`,
        html: `<a href='http://localhost:3000/api/auth/users/verify/${user.verificationToken}'> Please, confirm your email address GET </a>`,    };
    await sgMail.send(msg)
   
}

const login = async (email, password) => {
    const user = await User.findOne({ email, verify: true })
    
    if (!user) {
        throw new NotAuthorizedError(`no user with email: '${email}' found`)
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError('Wrong password')
    }

    const token = jwt.sign({
        _id: user._id,
        email: user.email
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

const changeAvatar = async (path, userId) => {
    const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { avatarURL: path } },
    { new: true }
    ).select({avatarURL: 1, _id: 0 })
  if (!updatedUser) {
    throw new NotAuthorizedError("Not authorized")
    }

  return updatedUser
}


module.exports = {
    registration,
    login,
    logout,
    current,
    changeSubscription,
    changeAvatar,
    verification,
    resendVerification
}