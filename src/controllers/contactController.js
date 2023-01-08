const {getContacts, getContactById, addContact, updateContact, removeContact, updateStatusContact} = require('../services/contactsService')


const listContactsController = async (_, res) => {
    const contacts = await getContacts()
    res.json({contacts})
}

const getByIdController = async (reg, res) => {
  const {id}  = reg.params
  const contact = await getContactById(id)
  res.json({contact})
} 

const removeContactController = async (reg, res) => {
    const { id } = reg.params
    await removeContact(id)
    res.json({"message": "contact deleted"})
}

const addContactController = async (reg, res) => {
    const {
      name,
      email,
      phone,
      favorite,
    } = reg.body
    const newContact = await addContact({name, email, phone, favorite})
    res.json({newContact})
}

const updateContactController = async (reg, res) => {
    const {id}  = reg.params
    const {
      name,
      email,
      phone
    } = reg.body
    
    const updatedContact = await updateContact(id, {name, email, phone})
    res.json({updatedContact})
}

const updateStatusContactController = async (reg, res) => {
  const { id } = reg.params
  const {
    favorite
  } = reg.body
  const updatedFavoriteStatus = await updateStatusContact(id, { favorite })
  res.json({updatedFavoriteStatus})
}

module.exports = {
  listContactsController,
  getByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
}
