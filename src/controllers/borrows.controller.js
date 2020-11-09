'use strict'

const httpStatus = require('http-status')
const borrows = require('../models/borrows.model')

exports.setlog = async (req, res, next) => {
	try {
		details = {
			keyId: req.body.keyId,
			borrowerId: req.body.borrowerId,
			securityId: req.body.securityId,
			date: req.body.date,
			status: req.body.status
		}

		await borrows.setLog(details, (err) => {
			if(!err)
				return res.status(httpStatus.CREATED).json({msg : 'Log successfully saved!', building : details})
			else {
				return res.status(httpStatus.CONFLICT).json({Error: `${err}`})
			}
		})



	} catch(err) {
		next(err)
	}
}
