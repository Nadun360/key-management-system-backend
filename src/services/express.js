'use strict'

// const config = require('../config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv/config');

const port = process.env.PORT

const router = express.Router();
// const errorHandler = require('../middlewares/error-handler')
// const apiRouter = require('../routes/api')
// const passport = require('passport')
// const passportJwt = require('../services/passport')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))



app.use('/', router)

// passport.use('jwt', passportJwt.jwt)
// app.use(passport.initialize())

// app.use('/api', apiRouter)
// app.use(errorHandler.handleNotFound)
// app.use(errorHandler.handleError)
var jar = {
	name: 'Lakshan',
	School: 'Kegalu Vidyalaya',
	Age: 16
}

router.get('/', (req, res) => {
	const today = new Date();
	res.send(`You logged in at ${today}`)
})

router.get('/player', (req, res) => {
	res.send(jar)
})

exports.start = () => {
  app.listen(port || 4000, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`Your app is running on port ${port}`)
  })
}

exports.app = app