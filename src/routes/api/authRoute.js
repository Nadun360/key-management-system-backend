'use strict'

const express = require('express')
const router = express.Router()
const { validate, ValidationError, Joi } = require('express-validation')
const registerValidation = require('../../validations/user.validation')
const authController = require('../../controllers/auth.controller')

router.post('/register', validate(registerValidation.register, {}, {}), authController.register)
router.post('/login', validate(registerValidation.login, {}, {}), authController.login)



module.exports = router