const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser') 
const mainRouter = require("./main.router.js")

const app = express();

const config = require('./config.js')

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//routes
app.use(config.apiPrefix, mainRouter)



module.exports = app
