const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
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

const Contacts = model('contact', contactSchema);

module.exports = Contacts;