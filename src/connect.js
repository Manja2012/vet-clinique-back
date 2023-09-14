const mongoose = require("mongoose");
const config = require('./config.js')

const connect = () => {
  mongoose.connect(config.MONGODB_URL)
}

module.exports = connect