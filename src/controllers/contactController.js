const {getContacts, getContactById, addContact, updateContact, removeContact, updateStatusContact} = require('../services/contactsService')


const listContactsController = async (reg, res) => {
  const { _id: userId } = reg.user
  let {favorite, page, limit} = reg.query
  limit = parseInt(limit) > 20 ? 20 : parseInt(limit)

    const contacts = await getContacts(userId, page, limit, favorite)
    res.json({contacts})
}

const getByIdController = async (reg, res) => {
  const { id: contactId } = reg.params
  const { _id: userId } = reg.user
  console.log(reg.params);
  const contact = await getContactById(userId, contactId)
  res.json({contact})
} 

const removeContactController = async (reg, res) => {
  const { id: contactId } = reg.params
  const {_id: userId} = reg.user
    await removeContact(contactId, userId)
    res.json({"message": "contact deleted"})
}

const addContactController = async (reg, res) => {
    const {
      name,
      email,
      phone,
      favorite,
  } = reg.body
  
  const {_id: userId} = reg.user
    const newContact = await addContact({name, email, phone, favorite}, userId)
    res.json({newContact})
}

const updateContactController = async (reg, res) => {
    const {
      name,
      email,
      phone
    } = reg.body
  const { id: contactId } = reg.params
  const {_id: userId} = reg.user
    const updatedContact = await updateContact(contactId, {name, email, phone}, userId)
    res.json({updatedContact})
}

const updateStatusContactController = async (reg, res) => {
  const { id: contactId } = reg.params
  console.log(reg.body);
  const {_id: userId} = reg.user
  const {
    favorite
  } = reg.body
  const updatedFavoriteStatus = await updateStatusContact(contactId,  favorite , userId)
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
