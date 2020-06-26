'use strict'

const { validate, ValidationError, Joi } = require('express-validation')

exports.register = {
	body: Joi.object({
	    email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
			.required(),
	    password: Joi.string()
			.regex(/[a-zA-Z0-9]{6,20}/)
			.required(),
	    name: Joi.string()
	    	.max(50)
	    	.required()
	  }),
}

exports.login = {
	body: Joi.object({
	    email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
			.required(),
	    password: Joi.string()
			.regex(/[a-zA-Z0-9]{6,20}/)
			.required(),
	  }),
}