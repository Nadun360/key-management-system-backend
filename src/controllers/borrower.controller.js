'use strict'

const httpStatus = require('http-status')
const borrower = require('../models/borrower.model')

exports.register = async (req, res, next) => {
	try {
		// Proceesing and making data object 
		const details = {
		    fname : req.body.fname,
		    lname : req.body.lname,
		    typeOfStaff : req.body.typeOfStaff,
		    designation :  req.body.designation
		}

		await borrower.registering(details, (err) => {
			// borrower successfully registered
			if (!err) {
			return res.status(httpStatus.CREATED).json({msg : 'borrower successfully registered!'})
			} else {
			// borrower ID already in the database
			if(err == "ER_DUP_ENTRY")
			  return res.status(httpStatus.CONFLICT).json({Error: `borrower '${details.fname} ${details.lname}' is already registered!`})
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
			borrowerId : req.body.borrowerId,
		    fname : req.body.fname,
		    lname : req.body.lname,
		    typeOfStaff : req.body.typeOfStaff,
		    designation :  req.body.designation
		}

		await borrower.updating(details, (err) => {
			// borrower successfully registered
			if (!err) {
			return res.status(httpStatus.ACCEPTED).json({msg : 'borrower successfully updated!'})
			} else {
				// Reuqested borroweId is not in the database
				if(err == "ZERO_ROWS_AFFECTED")
				  return res.status(httpStatus.CONFLICT).json({Error: `borrowerId '${details.borrowerId}' is not registered!`})
				// borrower details is already in another row
				else if (err == "ER_DUP_ENTRY")
					return res.status(httpStatus.CONFLICT).json({Error: `borrower details is already in another borrower Id!`})
				// Internal server error
				else
				  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
			} 
		})
	} catch (err) {
		next(err)
	}
}

exports.getborrower = async (req, res, next) => {
	try {

		await borrower.getBorrowerdata(req.body.borrowerId, (err, result) => {
			// Requested building found
			if (!err) {
				if (result.length != 0){
					return res.status(httpStatus.OK).json(result[0])					
				}
				else {
					return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: `BorrowerID ${req.body.borrowerId} is not registered!`})
				}
			} else {
				return res.status(httpStatus.CONFLICT).json({Error: err})
			}
		})
	} catch (err) {
		next(err)
	}
}