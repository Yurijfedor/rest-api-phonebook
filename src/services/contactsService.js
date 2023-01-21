const { Contact } = require('../db/contactModel')
const {WrongParametersError, UpdatedFavoriteStatusError} = require('../helpers/errors')

const getContacts = async(userId, page, limit, favorite) => {
  return await Contact.find({ userId, favorite: favorite })
    .select({ __v: 0 })
    .skip(parseInt(page))
    .limit(parseInt(limit))
}

const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({_id: contactId, userId})
  if (!contact) {
    throw new WrongParametersError('Not found')
    }
    return contact
}

const addContact = async ({ name, email, phone, favorite }, userId) => {
  const contact = new Contact({name, email, phone, favorite, userId})
  await contact.save()
  const savedContact = await Contact({email})
  return savedContact
 
}

const updateContact = async(contactId, {name, email, phone, favorite}, userId) => {
  await Contact.findOneAndUpdate(
    {_id: contactId, userId},
    { $set: { name, email, phone, favorite } },
    )
  const updatedContact = await Contact.findOne({_id: contactId, userId})
  return updatedContact
}

const removeContact = async(contactId, userId) => {
    await Contact.findOneAndRemove({_id: contactId, userId})
}

const updateStatusContact = async (contactId, { favorite }, userId) => {
  const updatedStatus = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: { favorite } },
    { new: true }
  )
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