const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  } ,
  message: {
    type: String,
    required: true,
  }
})

const Contact = model('contacts', contactSchema);

module.exports = Contact;