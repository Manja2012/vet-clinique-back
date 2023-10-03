const jwt = require('jsonwebtoken')
const config = require('../config')

const createJWT = (payload, secret = config.accessTokenSecret, options = { expiresIn: '10m' }) => {
  return jwt.sign(payload, secret, options)
}

const checkAccessToken = (token, secret = config.accessTokenSecret) => {
  return jwt.verify(token, secret)
}

module.exports = {
  createJWT,
  checkAccessToken,
}
