const Router = require('express').Router

const config = require('../config')
const { createJWT } = require('../utils/token-utils')

const authRouter = Router()

const signIn = (req, res) => {
  const { email, password } = req.body

  console.log('email', email, config.adminEmail, email === config.adminEmail)
  console.log('password', password, config.adminPassword, password === config.adminPassword)

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et password sont requis' })
  }

  if (email !== config.adminEmail || password !== config.adminPassword) {
    return res.status(401).json({ message: 'Ces identifiants ne correspondent à aucun utilisateur' })
  }

  const accessToken = createJWT({ email })

  return res.status(201).json({
    accessToken,
    message: 'Vous êtes connecté',
  })
}

authRouter.post('/tokens', signIn)

module.exports = authRouter
