const {Schema, model} = require('mongoose');

const appointmentSchema = new Schema({
    veterinaire: {
      type: String,
      required: true,
    }, 
    date: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
})

const Appointment = model('appointments', appointmentSchema);

module.exports = Appointment;