const config = require('./config.js');

const start = async () => {
  const app = require('./app.js');
  try {
    const connect = require('./connect.js')
    await connect()
    console.log('Connected to DB')
    await app.listen(config.port)
    console.log('Server is listening')
  } catch (error) {
    console.error(error)
    process.exit(1)    
  }
}

start()



