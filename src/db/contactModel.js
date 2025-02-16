const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'Set name for contact'],
  },
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
  },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
    Contact
}