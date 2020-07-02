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