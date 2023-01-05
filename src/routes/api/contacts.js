const express = require('express')
const router = express.Router()
const { addContactValidation, updateContactValidation } = require('../../middlewares/validationMiddleware')
const { listContactsController, getByIdController, removeContactController, addContactController, updateContactController } = require('../../controllers/contactController')



router.get('/', listContactsController)

router.get('/:id', getByIdController)

router.post('/', addContactValidation, addContactController)

router.delete('/:id', removeContactController)

router.put('/:id', updateContactValidation, updateContactController)

module.exports = router
