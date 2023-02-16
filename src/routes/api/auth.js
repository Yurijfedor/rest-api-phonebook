const express = require('express')
const router = express.Router()
const {asyncWrapper} = require('../../helpers/apiHelpers')
const {
    registrationController,
    loginController,
    logoutController,
    currentController,
    subscriptionController,
    avatarController,
    verifyController,
    resendVerifyController
} = require('../../controllers/authController')
const { userValidation } = require('../../middlewares/authValidationMiddleware')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const {uploadMiddleware} = require('../../middlewares/multerMiddleware')



router.post('/users/registr', userValidation, asyncWrapper(registrationController))

router.post('/users/login', userValidation, asyncWrapper(loginController))

router.post('/users/logout', authMiddleware, asyncWrapper(logoutController))

router.get('/users/current', authMiddleware, asyncWrapper(currentController))

router.patch('/users/subscription', authMiddleware, asyncWrapper(subscriptionController))

router.patch('/users/avatars', authMiddleware, uploadMiddleware.single('avatar'), asyncWrapper(avatarController))

router.get('/users/verify/:verificationToken', asyncWrapper(verifyController))

router.post('/users/verify', asyncWrapper(resendVerifyController))







module.exports = router
