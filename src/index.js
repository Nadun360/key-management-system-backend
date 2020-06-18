'use strict'

const app = require('./services/express')
// const mongoose = require('./services/mongoose')

// Start app and connect it to the database
app.start()
// mongoose.connect()

module.exports = app