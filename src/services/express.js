'use strict'

// const config = require('../config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
// const errorHandler = require('../middlewares/error-handler')
// const apiRouter = require('../routes/api')
// const passport = require('passport')
const passportJwt = require('../services/passport')

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
	const today = new Date();
	res.send(`we are on home page at ${today}`)
})


exports.start = () => {
  app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`${config.app} is running on port ${config.port}`)
  })
}

exports.app = app