'use strict'

const config = require('../config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const api = require('../routes/api')
const port = (config.port) ? config.port : 4000
const errorHandler = require('../middlewares/error-handler')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use(helmet())

// this is need when the product is on launch
if (config.env != 'test') app.use(morgan('combined'))

// Route of the app will be done in here
app.use('/', api)

// set the middlewares to check the errors
app.use(errorHandler.handleError)
app.use(errorHandler.handleNotFound)

// module export to use
exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`${config.app} is running on port ${port}`)
  })
}

exports.app = app