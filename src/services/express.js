'use strict'

const config = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

exports.start = () => {
  app.listen(config.port, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`${config.app} is running on port ${config.port}`)
  })
}

exports.app = app