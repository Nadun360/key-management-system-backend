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
					// Building name is already taken
					else if (err.msg.includes('Building_Name'))
						return res.status(httpStatus.CONFLICT).json({Error: `BuildingName '${details.buildingName}' is already taken!`})
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

exports.update = async (req, res, next) => {
	try {
		// Proceesing and making data object 
		const details = {
		    buildingID : req.body.buildingID,
		    buildingName : req.body.buildingName,
		    keyID : req.body.keyID
		}

		await building.updating(details, (err) => {
			// building successfully updated
			if (!err) {
			return res.status(httpStatus.ACCEPTED).json({msg : 'building successfully updated!'/*, building : details*/})
			} else {
				// Reuqested buildingID is not in the database
				if(err == "ZERO_ROWS_AFFECTED")
					return res.status(httpStatus.NOT_ACCEPTABLE).json({Error: `buildingId '${details.buildingID}' is not registered!`})
				else if (err == "ER_NO_REFERENCED_ROW_2")
					return res.status(httpStatus.NOT_ACCEPTABLE).json({Error: `KeyID ${details.keyID} is not registered!`})
				// building details is already in another row
				else if (err == "ER_DUP_ENTRY")
					return res.status(httpStatus.NOT_ACCEPTABLE).json({Error: `building details is already in another buildingId!`})
				// Internal server error
				else
					return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
			} 
		})
	} catch (err) {
		next(err)
	}
}


exports.getbyid = async (req, res, next) => {
	try {

		await building.findBuildingByID(req.body.buildingID, (err, result) => {
			// Requested building found
			if (!err) {
				if (result.length != 0)
					return res.status(httpStatus.OK).json(result[0])
				else 
					return res.status(httpStatus.CONFLICT).json({Error: `BuildingID ${req.body.buildingID} is not registered!`})
			} else {
				return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
			}
		})
	} catch (err) {
		next(err)
	}
}

exports.getbyname = async (req, res, next) => {
	try {

		await building.findBuildingByName(req.body.buildingName, (err, result) => {
			// Requested building found
			if (!err) {
				if (result.length != 0)
					return res.status(httpStatus.OK).json(result)
				else 
					return res.status(httpStatus.CONFLICT).json({msg: `BuildingName ${req.body.buildingName} is not registered!`})
			} else {
				return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
			}
		})
	} catch (err) {
		next(err)
	}
}