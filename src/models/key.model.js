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

exports.updating = async (key, callback) => {
	if (key) {
		// sql query to register a key
		const sql_regi = `UPDATE Key_Detail SET No_Of_Keys = ${key.noOfKeys}, Availability = ${key.availability} WHERE Key_ID = ${key.keyID};`

		// executing the query
		await client.sendQuery(sql_regi, (err, result) => {
			if(err) {
				console.error(`SQLQueryError: ${err.sqlMessage}`)
				callback(err.code)
			} else {
				if (result.affectedRows > 0) {
					console.log(`Key_ID '${key.keyID}' successfully updated!`)
					callback(null)
				}
				else {
					callback("ZERO_ROWS_AFFECTED")
				}
			}
		})
	}
}

exports.findKey = async (keyId, callback) => {
	if (keyId) {
		// sql query to find a key by Key_ID 
		const sql_getkey = `SELECT * FROM Key_Detail WHERE Key_ID = ${keyId}`

		// executing the query
		await client.sendQuery (sql_getkey, (err, result) => {
			// error happend when executing
			if (err) {
				console.error(`SQLQueryError: ${err.sqlMessage}`)
        		callback(err.code, null)
			}
			// key found or no key related to given key id
			else if (!err && result.length <= 1) {
				callback(null, result)
			}
			// multiple keys found for given key id
			else {
				console.error(`Duplicate instance found on Key_ID ${keyId}`)
        		callback(`Multiple keys found on Key_ID ${keyId}`, null)
			}
		})
	}
}