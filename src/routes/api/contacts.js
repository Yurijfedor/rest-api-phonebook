const express = require('express')
const router = express.Router()
const { addContactValidation, updateContactValidation } = require('../../middlewares/validationMiddleware')
const { listContacts, getById, removeContact, addContact, updateContact } = require('../../controllers/contactController')



router.get('/', listContacts)

router.get('/:id', getById)

router.post('/', addContactValidation, addContact)

router.delete('/:id', removeContact)

router.put('/:id', updateContactValidation, updateContact)

module.exports = router
