'use strict'

const client = require('../services/mysql')

exports.registering = async (building, callback) => {
	if (building) {
		// sql query to register a building
		const sql_regi = `INSERT INTO Building VALUES (${building.buildingID}, '${building.buildingName}', ${building.keyID});`

		// executing the query
		await client.sendQuery(sql_regi, (err) => {
			if(err) {
				if (err.code != "ER_DUP_ENTRY" && err.code != "ER_NO_REFERENCED_ROW_2")
					console.error(`SQLQueryErrorI: ${err.sqlMessage}`)
				
				callback({code:err.code, msg:err.sqlMessage})
			} else {
				console.log(`BuildingID ${building.buildingID} was successfully registered!`)
				callback(null)
			}
		})
	}
}

exports.updating = async (building, callback) => {
	if (building) {
		const sql_update =`UPDATE Building SET Building_Name = '${building.buildingName}', Key_ID = ${building.keyID}  WHERE Building_ID = ${building.buildingID};`
		
		await client.sendQuery(sql_update, (err, result) => {
			if(err) {
				callback(err.code)
			} else {
				if (result.affectedRows > 0) {
					console.log(`buildingID ${building.keyID} successfully updated!`)
					callback(null)
				}
				else {
					callback("ZERO_ROWS_AFFECTED")
				}
			}
		})
	}
}



exports.findBuildingByID = async (buildingID, callback) => {
	if (buildingID) {
		// sql query to find a building by Building_ID 
		const sql_getbuilding = `SELECT * FROM Building WHERE Building_ID = ${buildingID};`
		 
		// executing the query
		await client.sendQuery (sql_getbuilding, (err, result) => {
			// error happend when executing
			if (err) {
				console.error(`SQLQueryError: ${err.sqlMessage}`)
        		callback(err.code, null)
			}
			// building found or no building related for given building id
			else if (!err && result.length <= 1) {
				callback(null, result)
			}
			// multiple buildings found for given building id
			else {
				console.error(`Duplicate instance found on Building_ID ${buildingID}`)
        		callback(`Multiple keys found on Building_ID ${buildingID}`, null)
			}
		})
	}
}

exports.findBuildingByName = async (buildingName, callback) => {
	if (buildingName) {
		// sql query to find a building by Building_ID 
		const sql_getbuilding = `SELECT * FROM Building WHERE Building_Name = "${buildingName}";`
		 
		// executing the query
		await client.sendQuery (sql_getbuilding, (err, result) => {
			// error happend when executing
			if (err) {
				console.error(`SQLQueryError: ${err.sqlMessage}`)
        		callback(err.code, null)
			}
			// building found or no building related for given building id
			else if (!err && result.length <= 1) {
				callback(null, result)
			}
			// multiple buildings found for given building id
			else {
				console.error(`Duplicate instance found on Building_Name ${buildingName}`)
        		callback(`Multiple keys found on Building_Name ${buildingName}`, null)
			}
		})
	}
}