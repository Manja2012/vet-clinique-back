const Router = require('express').Router

const contacts = require('./contacts/contacts.controller.js')
const reviews = require('./reviews/reviews.controller.js')
// const clients = require('./clients/clients.controller.js')
const appointments = require('./appointments/appointments.controller.js')
const authRouter = require('./auth/auth.controller.js')

const router = new Router()

router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' })
})

router.use('/contacts', contacts)
router.use('/reviews', reviews)
// router.use('/clients', clients)
router.use('/appointments', appointments)
router.use('/auth', authRouter)



module.exports = router