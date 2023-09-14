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

// require('dotenv').config()
// const mongoose = require ('mongoose')

// const username = encodeURIComponent(process.env.DB_USERNAME)
// const password = encodeURIComponent(process.env.DB_PASSWORD)

// connect().catch((error) => {
//     console.log(error)
// })

// async function connect(){
//     await mongoose.connect('mongodb+srv://' + username + ':' + password + '@cluster0.cbnxttu.mongodb.net/?retryWrites=true&w=majority')
// }



