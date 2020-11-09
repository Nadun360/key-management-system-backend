'use strict'

const { validate, ValidationError, Joi } = require('express-validation')

exports.register = {
	body: Joi.object({
	    fname: Joi.string()
	    	.max(20)
	    	.regex(/[a-zA-Z]/)
	    	.required(),
	    lname: Joi.string()
	    	.max(30)
	    	.regex(/[a-zA-Z]/)
	    	.required(),
	    typeOfStaff: Joi.string()
	    	.max(40)
	    	.regex(/[a-zA-Z]/)
	    	.required(),
	    designation: Joi.string()
	    	.max(40)
	    	.required()
	}),
}

exports.update = {
	body: Joi.object({
		borrowerId: Joi.number()
			.integer()
			.required(),
	    fname: Joi.string()
	    	.max(20)
	    	.regex(/[a-zA-Z]/)
	    	.required(),
	    lname: Joi.string()
	    	.max(30)
	    	.regex(/[a-zA-Z]/)
	    	.required(),
	    typeOfStaff: Joi.string()
	    	.max(40)
	    	.regex(/[a-zA-Z]/)
	    	.required(),
	    designation: Joi.string()
	    	.max(40)
	    	.required()
	}),
}

exports.getbyid = {
	body: Joi.object({
		borrowerId: Joi.number()
			.integer()
			.required(),
	}),
}