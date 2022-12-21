const { json } = require('express');
const fs = require('fs/promises');
const path = require('path')
const { v4: uuidv4 } = require("uuid")

const pathContacts = path.resolve('./src/models/contacts.json')



const listContacts = async (reg, res, next) => {
  try {
    const data = await fs.readFile(pathContacts, "utf-8"); 
    const contacts = JSON.parse(data)
  res.json({contacts})
  } catch (error) {
    console.log(error.message);
  }
}

const getById = async (reg, res, next) => {
  try {
    const data = await fs.readFile(pathContacts, "utf-8"); 
  const contacts = JSON.parse(data)
  const {id}  = reg.params
  const [contact] = contacts.filter((item) => item.id === id)
  if (!contact) {
    return res.status(404).json({message: 'Not found'})
  }

  res.json({contact})
  } catch (error) {
    console.log(error.message);
  }
  
} 

const removeContact = async (reg, res, next) => {
  try {
const data = await fs.readFile(pathContacts, "utf-8"); 
  const contacts = JSON.parse(data)
    const { id } = reg.params
    const index = contacts.findIndex(
      (item) => id === item.id
    );
    if (!index || index === -1) {
      return res.status(404).json({message: 'Not found'})
    }
     contacts.splice(index, 1);
    await fs.writeFile(pathContacts, JSON.stringify(contacts), "utf-8");
    res.json({"message": "contact deleted"})
  } catch (error) {
    console.log(error.message);
  }
}

const addContact = async (reg, res, next) => {
  try {
    const {
      name,
      email,
      phone,
    } = reg.body
    
    const data = await fs.readFile(pathContacts, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(pathContacts, JSON.stringify(contacts), "utf-8");
    res.json({newContact})
  } catch (error) {
    console.log(error.message);
  }
}

const updateContact = async (reg, res, next) => {

  try {
    // if (JSON.stringify(reg.body) === '{}') {
    //   return res.status(400).json({"message": "missing fields"})
    // }
    const {
      name,
      email,
      phone
    } = reg.body
    
    const data = await fs.readFile(pathContacts, "utf-8");
    const contacts = JSON.parse(data);
    const {id} = reg.params
    contacts.forEach(element => {
      if (element.id === id) {
        if (name) {
          element.name = name
        } else return
        if (email) {
        element.email = email
        } else return
        if (phone) {
          element.phone = phone
        } else return
      }
    });
    const indexOfUpdatedContact = contacts.findIndex((item) => id === item.id);
    const updatedContact = contacts[indexOfUpdatedContact]
    console.log(updatedContact);
    await fs.writeFile(pathContacts, JSON.stringify(contacts), "utf-8");
    res.json({updatedContact})
  } catch (error) {
    res.status(404).json({"message": "Not found"})
  }
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
