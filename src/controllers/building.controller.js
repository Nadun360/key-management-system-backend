'use strict'

const httpStatus = require('http-status')
const building = require('../models/building.model')

exports.register = async (req, res, next) => {
	try {
		// Proceesing and making data object 
		const details = {
		    buildingID : req.body.buildingID,
		    buildingName : req.body.buildingName,
		    keyID : req.body.keyID
		}

		await building.registering(details, (err) => {
			// Building successfully registered
			if (!err) {
				return res.status(httpStatus.CREATED).json({msg : 'Building successfully registered!', building : details})
			} else {
				// Building ID, Key ID couple is already in the database
				if(err.code == "ER_DUP_ENTRY"){
					// Building ID already registered
					if (err.msg.includes('PRIMARY'))
						return res.status(httpStatus.CONFLICT).json({Error: `BuildingID '${details.buildingID}' is already taken!`})
					// Key ID already used for a building
					else
						return res.status(httpStatus.CONFLICT).json({Error: `KeyID '${details.keyID}' is already taken!`})

				}
				// Key ID is not registered yet
				else if(err.code == "ER_NO_REFERENCED_ROW_2")
					return res.status(httpStatus.CONFLICT).json({Error: `KeyID '${details.keyID}' is not registered yet!`})
				// Internal server error
				else
					return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err.code})
			}
		})
	} catch (err) {
		next(err)
	}
}