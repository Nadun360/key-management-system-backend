'use strict'

const client = require('../services/mysql')

exports.registering = async (key, callback) => {
	if (key) {
		// sql query to register a key
		const sql_regi = `INSERT INTO Key_Detail VALUES (${key.keyID}, ${key.noOfKeys}, ${key.availability});`

		// executing the query
		await client.sendQuery(sql_regi, (err, result) => {
			if(err) {
				if (err.code != "ER_DUP_ENTRY")
					console.error(`SQLQueryError: ${err.sqlMessage}`)
				
				callback(err.code)
			} else {
				console.log(`KeyID ${key.keyID} was successfully registered!`)
				callback(null)
			}
		})
	}
}