const {Contact} = require('../db/contactModel')

const getContacts = async() => {
return await Contact.find({})
}

const getContactById = async(id) => {
    const contact = await Contact.findById(id)
  if (!contact) {
    return res.status(404).json({message: 'Not found'})
    }
    return contact
}

const addContact = () => {
    
}

const updateContact = () => {
    
}

const removeContact = () => {
    
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
}