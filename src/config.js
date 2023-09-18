const mongoDbUrl = process.env.MONGODB_URL
const metaPassword = process.env.META_PASSWORD;
const fromEmail = process.env.FROM_EMAIL;
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;


module.exports = {
  port,
  mongoDbUrl,
  apiPrefix: '/api',
  metaPassword,
  fromEmail,
  apiKey,
}