const {Schema, model} = require('mongoose');

const clientSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
})

const Client = model('clients', clientSchema);

module.exports = Client;