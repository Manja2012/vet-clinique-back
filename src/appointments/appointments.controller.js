const Router = require('express').Router;
const nodemailer = require('nodemailer');
const { validationResult } = require("express-validator");

const Appointment = require("./appointment.model.js");
const config = require('../config.js')

const router = new Router();

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    console.log(appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json("Couldn't get emails: ", error.message);
  }
};


router.get('', getAppointments)
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    console.log(appointment);
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json("Couldn't get emails: ", error.message);
  }
};
router.get('/:id', getAppointment)

const createAppointment = async (req, res) => {
  try {
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { veterinaire, date, name, email } = req.body;

    // TODO: rechercher si un client avec cet email existe

    const newAppointment = new Appointment({
      veterinaire,
      date,
      name,
      email,
    });
    const savedAppointment = await newAppointment.save();

    try {
      const nodemailerConfig = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: config.fromEmail,
          pass: config.metaPassword
        }
      }

      const DateTime = new Date(date);
      
      const transport = nodemailer.createTransport(nodemailerConfig);
      const emailData = {
        to: email,
        from: config.fromEmail,
        subject: "Confirmer le RDV",
        html: `<p>Madame(Monsieur) ${name},
        Vous avez un rendez-vous le ${DateTime.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',

          hour: '2-digit',
          minute: '2-digit',
        })} avec le docteur ${veterinaire} à la clinique "Biomir".</p>`,
        text: `Madame(Monsieur) ${name},
        Vous avez un rendez-vous le ${DateTime.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',

          hour: '2-digit',
          minute: '2-digit',
        })} avec le docteur ${veterinaire} à la clinique "Biomir".`
      };

      await transport.sendMail(emailData)
      console.log("email send success")
      res.status(201).json(savedAppointment)
    } catch (error) {
      console.error(error)
      res.status(500).json({err: 1, message: error.message})
    }

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message });
  }
};

router.post('', createAppointment)

const removeAppointment = async (req, res) => {
  try {
    const id = req.params.id

    const toDelete = await Appointment.findById(id)
    if (toDelete) {
      await toDelete.deleteOne()
      res.status(200).json({ deletedAppointment: toDelete})
      return
    }
    res.status(200).json({ deletedAppointment: 'nothing to delete'})
  } catch (error) {
    console.error(error)
  }
}

router.delete('/:id', removeAppointment)

module.exports = router