'use strict'

const express = require('express')
const router = express.Router()
const { validate, ValidationError, Joi } = require('express-validation')
const userValidation = require('../../validations/user.validation')
const authController = require('../../controllers/auth.controller')
const keyValidation = require('../../validations/key.validation')
const keyController = require('../../controllers/key.controller')
const buildingValidation = require('../../validations/building.validation')
const buildingController = require('../../controllers/building.controller')

router.post('/register', validate(userValidation.register, {}, {}), authController.register)
router.post('/login', validate(userValidation.login, {}, {}), authController.login)


router.post('/key/register', validate(keyValidation.register, {}, {}), keyController.register)
router.post('/building/register', validate(buildingValidation.register, {}, {}), buildingController.register)


module.exports = router