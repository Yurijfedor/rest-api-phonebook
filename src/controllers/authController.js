const {registration, login, logout, current, changeSubscription} = require('../services/authService')

const registrationController = async (reg, res) => {
    const {
        email,
        password
    } = reg.body
   const user = await registration(email, password)
    res.status(201).json({ user })
}

const loginController = async (reg, res) => {
    const {
        email,
        password
    } = reg.body
   const loggedInUser =  await login(email, password)
    res.status(200).json({ loggedInUser })
}

const logoutController = async (reg, res) => {
    const { _id: userId } = reg.user
    const token = reg.token
   const user = await logout(userId, token)
    res.status(204).json({message:''})
}

const currentController = async (reg, res) => {
    const { _id: userId } = reg.user
   const user = await current(userId)
    res.status(200).json({user})
}

const subscriptionController = async (reg, res) => {
    const { _id: userId } = reg.user
    console.log(userId);
    const { subscription } = reg.body
   const user = await changeSubscription(subscription, userId)
    res.status(200).json({user})
}

module.exports = {
    registrationController,
    loginController,
    logoutController,
    currentController,
    subscriptionController
}