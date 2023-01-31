const gravatar = require('gravatar')
const Jimp = require('jimp');
const Path = require('path')
const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid');
const {WrongParametersError} = require('../helpers/errors')
const { registration, login, logout, current, changeSubscription, changeAvatar, verification, resendVerification } = require('../services/authService')

const registrationController = async (reg, res) => {
    const {
        email,
        password
    } = reg.body
    const verificationToken = uuidv4()
    const avatarUrl = gravatar.url(email, {s: '200', r: 'pg', d: '404'})
   const user = await registration(email, password, avatarUrl, verificationToken)
    res.status(201).json({ user })
}

const verifyController = async (reg, res) => {
    const {
       verificationToken
    } = reg.params
   await verification(verificationToken)
    res.status(200).json({ message: "Verification successful" })
}

const resendVerifyController = async (reg, res) => {
    const {
       email
    } = reg.body

    if (!email) {
         throw new WrongParametersError(`missing required field email`)
    }

   await resendVerification(email)
    res.status(200).json({ 'message': "Verification email sent" })
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

const avatarController = async (reg, res) => {
   
    const { _id: userId, email } = reg.user
    const { path, filename } = reg.file

    const [nic, _] = email.split('@')
    const [, extention] = filename.split('.')
    const fileName = `${nic}.${extention}`

    const image = await Jimp.read(path);
	image.resize(250, 250, Jimp.RESIZE_BEZIER);
    await image.writeAsync(path);

    const newPath = Path.resolve(__dirname, "../../public/avatars", fileName)
    try {
        await fs.rename(path, newPath)
    } catch (error) {
        console.error('error while moving file to public', error);
    }
    
   const user = await changeAvatar(newPath, userId) 
    
    res.status(200).json({user})
}


module.exports = {
    registrationController,
    loginController,
    logoutController,
    currentController,
    subscriptionController,
    avatarController,
    verifyController,
    resendVerifyController
}