const { Contact } = require('../db/contactModel')
const {WrongParametersError, UpdatedFavoriteStatusError} = require('../helpers/errors')

const getContacts = async() => {
return await Contact.find({})
}

const getContactById = async(id) => {
    const contact = await Contact.findById(id)
  if (!contact) {
    throw new WrongParametersError('Not found')
    }
    return contact
}

const addContact = async ({name, email, phone, favorite}) => {
  const contact = new Contact({name, email, phone, favorite})
  await contact.save()
  return contact
 
}

const updateContact = async(id, {name, email, phone, favorite}) => {
  await Contact.findByIdAndUpdate(id, { $set: { name, email, phone, favorite } })
  const updatedContact = await Contact.findById(id)
  return updatedContact
}

const removeContact = async(id) => {
    await Contact.findByIdAndRemove(id)
}

const updateStatusContact = async (id, { favorite }) => {
  const updatedStatus = await Contact.findByIdAndUpdate(id, { $set: { favorite } }, { new: true })
  if (!updatedStatus) {
    throw new UpdatedFavoriteStatusError("Not found")
  }
  return updatedStatus
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
    updateStatusContact,
}