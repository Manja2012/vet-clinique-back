const Router = require('express').Router;
const nodemailer = require('nodemailer');
const { validationResult } = require("express-validator");

const Client = require("./client.model.js");
const config = require('../config.js')

const router = new Router();

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    console.log(clients);
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json("Couldn't get emails: ", error.message);
  }
};

router.get('', getClients)

const createClient = async (req, res) => {
  try {
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { veterinaire, date, name, email } = req.body;
    console.log('req.body', req.body)
    const newClient = new Client({
      veterinaire,
      date,
      name,
      email,
    });
    const savedClient = await newClient.save();

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

      await transport.sendMail(emailData)
      console.log("email send success")
      res.status(201).json({ client: savedClient })
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

router.post('', createClient)

const removeClient = async (req, res) => {
  try {
    const id = req.params.id

    const toDelete = await Client.findById(id)
    if (toDelete) {
      await toDelete.deleteOne()
      res.status(200).json({ deletedClient: toDelete})
      return
    }
    res.status(200).json({ deletedClient: 'nothing to delete'})
  } catch (error) {
    console.error(error)
  }
}

router.delete('/:id', removeClient)

module.exports = router