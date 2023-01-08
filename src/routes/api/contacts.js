const express = require('express')
const router = express.Router()
const { addContactValidation, updateContactValidation, updateFavoriteStatusValidation} = require('../../middlewares/validationMiddleware')
const {asyncWrapper} = require('../../helpers/apiHelpers')
const {
    listContactsController,
    getByIdController,
    removeContactController,
    addContactController,
    updateContactController,
    updateStatusContactController
} = require('../../controllers/contactController')



router.get('/', asyncWrapper(listContactsController))

router.get('/:id', asyncWrapper(getByIdController))

router.post('/', addContactValidation, asyncWrapper(addContactController))

router.delete('/:id', asyncWrapper(removeContactController))

router.put('/:id', updateContactValidation, asyncWrapper(updateContactController))

router.put('/:id/favorite', updateFavoriteStatusValidation, asyncWrapper(updateStatusContactController))

module.exports = router
