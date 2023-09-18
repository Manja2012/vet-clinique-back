const Router = require('express').Router;
const nodemailer = require('nodemailer');
const { validationResult } = require("express-validator");

const Contact = require("./contact.model.js");
const config = require('../config.js')

const router = new Router();

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Couldn't get emails: ", error.message);
  }
};

router.get('', getContacts)

const createContact = async (req, res) => {
  try {
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, message } = req.body;
    console.log('req.body', req.body)
    const newContact = new Contact({
      name,
      phone,
      email,
      message,
    });
    const savedContact = await newContact.save();

    res.json({ contact: savedContact })

    try {
      const nodemailerConfig = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "mariannademchenko4@gmail.com",
          pass: config.metaPassword
        }
      }
      const transport = nodemailer.createTransport(nodemailerConfig);
      const emailData = {
        to: email,
        from: config.fromEmail,
        subject: "Confirmation blablabla email",
        html: `<p>Test email</p>`,
        text: `Première ligne importante

          Et la suite ici
        `
      };

      transport.sendMail(emailData)
      console.log("email send success")
    } catch (error) {
      console.error(error)
    }

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message });
  }
};

router.post('', createContact)

const removeContact = async (req, res) => {
  try {
    const id = req.params.id

    const toDelete = await Contact.findById(id)
    if (toDelete) {
      await toDelete.deleteOne()
      res.status(200).json({ deletedContact: toDelete})
      return
    }
    res.status(200).json({ deletedContact: 'nothing to delete'})
  } catch (error) {
    console.error(error)
  }
}

router.delete('/:id', removeContact)

module.exports = router