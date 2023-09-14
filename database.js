require('dotenv').config()
const mongoose = require ('mongoose')

const username = encodeURIComponent(process.env.DB_USERNAME)
const password = encodeURIComponent(process.env.DB_PASSWORD)

connect().catch((error) => {
    console.log(error)
})

async function connect(){
    await mongoose.connect('mongodb+srv://' + username + ':' + password + '@cluster0.cbnxttu.mongodb.net/?retryWrites=true&w=majority')
}