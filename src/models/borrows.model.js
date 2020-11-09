'use strict'

const client = require('../services/mysql')

exports.setLog = async (log, callback) => {
	if (log) {
		const sql_log = `INSERT INTO Borrows VALUES (${log.keyId}, ${log.borrowerId}, ${log.securityId}, "${log.date}", "${log.status}");`

		await client.sendQuery(sql_log, (err) => {
			if(err) {
				if (err.code != "ER_DUP_ENTRY" && err.code != "ER_NO_REFERENCED_ROW_2")
					console.error(`SQLQueryErrorI: ${err.sqlMessage}`)
				
				callback({code:err.code, msg:err.sqlMessage})
			} else {
				console.log(`log came`)
				callback(null)
			}
		})
	}
}