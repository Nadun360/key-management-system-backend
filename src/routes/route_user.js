const config = require('../config')
const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')
router.use(cors())

















router.post('/register', (req, res) => {
	const today = new Date();
	const userData = {

	}
	res.send('we are on home page')
})

module.exports = router;