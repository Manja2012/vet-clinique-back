require('dotenv').config()

const mongoDbUrl = process.env.MONGODB_URL
const metaPassword = process.env.META_PASSWORD;
const fromEmail = process.env.FROM_EMAIL;
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

module.exports = {
  port,
  mongoDbUrl,
  apiPrefix: '/api',
  metaPassword,
  fromEmail,
  apiKey,
  accessTokenSecret,
  refreshTokenSecret,
  adminEmail,
  adminPassword
}