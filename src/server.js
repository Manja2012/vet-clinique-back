const app = require('./app.js');
require('dotenv').config()

const start = async () => {
  try {
    const connect = require('./connect.js')
    await connect()
    console.log('Connected to DB')
    await app.listen(3000)
    console.log('Server is listening')
  } catch (error) {
    console.error(error)
    process.exit(1)    
  }
}

start()



