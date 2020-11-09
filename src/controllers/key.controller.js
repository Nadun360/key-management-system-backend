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

		await key.registering(details, (err) => {
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

exports.update = async (req, res, next) => {
	try {
		// Proceesing and making data object 
		const details = {
		    keyID : req.body.keyID,
		    noOfKeys : req.body.noOfKeys,
		    availability : (req.body.availability == "Available") ? true : false
		}

		await key.updating(details, (err) => {
			// Key successfully registered
			if (!err) {
			return res.status(httpStatus.ACCEPTED).json({msg : 'Key successfully updated!', key : details})
			} else {
				// Reuqested keyID is not in the database
				if(err == "ZERO_ROWS_AFFECTED")
					return res.status(httpStatus.NOT_ACCEPTABLE).json({Error: `keyID '${details.keyID}' is not registered!`})
				// Internal server error
				else
					return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
			}
		})
	} catch (err) {
		next(err)
	}
}




// This has to be implemented
exports.getkey = async (req, res, next) => {
	try {
		await key.findKey(req.body.keyID, (err, result) => {
			if (!err) {
				if (result.length != 0)
					return res.status(httpStatus.OK).json(result[0])
				else 
					return res.status(httpStatus.CONFLICT).json({Error: `key ID ${req.body.keyID} is not registered!`})
			} else {
				return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
			}
		})
	} catch (err) {
		next(err)
	}
}