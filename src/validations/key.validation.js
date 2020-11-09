'use strict'

const { validate, ValidationError, Joi } = require('express-validation')

exports.register = {
	body: Joi.object({
	    keyID: Joi.number()
	    	.integer()
			.required(),
	    noOfKeys: Joi.number()
	    	.integer()
			.required(),
	    availability: Joi.string()
	    	.valid('Available', 'NotAvailable')
	    	.required()
	}),
}

exports.getkey = {
	body: Joi.object({
	    keyID: Joi.number()
	    	.integer()
			.required(),
	}),
}