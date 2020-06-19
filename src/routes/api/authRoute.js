'use strict'

const express = require('express')
const router = express.Router()
const { validate, ValidationError, Joi } = require('express-validation')
const registerValidation = require('../../validations/user.validation')
const authController = require('../../controllers/auth.controller')

router.post('/register', validate(registerValidation, {}, {}), authController.register)
router.post('/login', authController.login)



module.exports = router