'use strict'
require('dotenv/config');
// const config = require('../config')
const express = require('express')
const router = express.Router()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const port = process.env.PORT;
// const errorHandler = require('../middlewares/error-handler')
// const apiRouter = require('../routes/api')
// const passport = require('passport')
// const passportJwt = require('../services/passport')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

// passport.use('jwt', passportJwt.jwt)
// app.use(passport.initialize())

// app.use('/api', apiRouter)
// app.use(errorHandler.handleNotFound)
// app.use(errorHandler.handleError)

router.get('/', (req, res) => {
	// const today = new Date();
	res.send('<h1>Hello their!</h1>')
})


exports.start = () => {
  app.listen(port || 4500, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`your app is running on port ${port}`)
  })
}

exports.app = app