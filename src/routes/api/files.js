const express = require('express')
const path = require('path')
const router = express.Router()
const {asyncWrapper} = require('../../helpers/apiHelpers')
const {
    uploadController,
} = require('../../controllers/filesController')
const { uploadMiddleware } = require('../../middlewares/multerMiddleware')
const FILE_DIR = path.resolve('./public/avatars')


router.post('/upload', uploadMiddleware.single('avatar'), asyncWrapper(uploadController))
router.use('/download', express.static(FILE_DIR))


module.exports = router

