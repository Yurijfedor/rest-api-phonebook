const { Contact } = require('../db/contactModel')
const {getContacts, getContactById, addContact, updateContact, removeContact} = require('../services/contactsService')


const listContactsController = async (_, res) => {
  try {
    const contacts = await getContacts()
    res.json({contacts})
  } catch (error) {
    console.log(error.message);
  }
}

const getByIdController = async (reg, res) => {
  try {
  const {id}  = reg.params
  const contact = await getContactById(id)

  res.json({contact})
  } catch (error) {
    console.log(error.message);
  }
  
} 

const removeContactController = async (reg, res) => {
  try {
    const { id } = reg.params
    await Contact.findByIdAndRemove(id)
    res.json({"message": "contact deleted"})
  } catch (error) {
    console.log(error.message);
  }
}

const addContactController = async (reg, res) => {
  try {
    const {
      name,
      email,
      phone,
    } = reg.body
    const contact = new Contact({ name, email, phone })
   await contact.save()
    res.json({contact})
  } catch (error) {
    console.log(error.message);
  }
}

const updateContactController = async (reg, res) => {
  try {
    const {id}  = reg.params
    const {
      name,
      email,
      phone
    } = reg.body
    await Contact.findByIdAndUpdate(id, { $set: { name, email, phone } })
    const updatedContact = await Contact.findById(id)
    res.json({updatedContact})
  } catch (error) {
    res.status(404).json({"message": "Not found"})
  }
}

module.exports = {
  listContactsController,
  getByIdController,
  removeContactController,
  addContactController,
  updateContactController,
}
