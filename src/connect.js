const mongoose = require("mongoose");
const config = require('./config.js')

const connect = () => {
  mongoose.connect(config.mongoDbUrl)
}

module.exports = connect