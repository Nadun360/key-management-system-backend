'use strict'

const express = require('express')
const router = express.Router()
const authRouter = require('./authRoute')
const CO226 = require('../../public/introduction')

// will send little introduction about the API
router.get('/', (req, res) => {
	// In future if we want to send html page for instroduction
		// res.set('Content-Type', 'text/html')
	res.status(200).send({CO226})
})

// adding authentication routes for the application
router.use('/api', authRouter)

module.exports = router