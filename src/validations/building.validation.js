'use strict'

const { validate, ValidationError, Joi } = require('express-validation')

exports.register = {
	body: Joi.object({
	    buildingID: Joi.number()
	    	.integer()
			.required(),
	    buildingName: Joi.string()
	    	.max(50)
			.required(),
	    keyID: Joi.number()
	    	.integer()
	    	.required()
	}),
}