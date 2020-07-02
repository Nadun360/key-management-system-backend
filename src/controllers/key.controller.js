'use strict'

const httpStatus = require('http-status')
const key = require('../models/key.model')

exports.register = async (req, res, next) => {
	try {
		// Proceesing and making data object 
		const details = {
		    keyID : req.body.keyID,
		    noOfKeys : req.body.noOfKeys,
		    availability : (req.body.availability == "Available") ? true : false
		}

		await key.registering(details, (err, result) => {
			// Key successfully registered
			if (!err) {
			return res.status(httpStatus.CREATED).json({msg : 'Key successfully registered!', key : details})
			} else {
			// Key ID already in the database
			if(err == "ER_DUP_ENTRY")
			  return res.status(httpStatus.CONFLICT).json({Error: `KeyID '${details.keyID}' is already taken!`})
			// Internal server error
			else
			  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
			}
		})
	} catch (err) {
		next(err)
	}
}