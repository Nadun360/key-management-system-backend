'use strict'

const client = require('../services/mysql')

exports.registering = async (borrower, callback) => {
	if (borrower) {
		// sql query to register a borrower
		const sql_regi = `INSERT INTO Borrower (FName, LName, Type_Of_Staff, Designation) VALUES ('${borrower.fname}', '${borrower.lname}', '${borrower.typeOfStaff}', '${borrower.designation}');`

		// executing the query
		await client.sendQuery(sql_regi, (err, result) => {
			if(err) {
				if (err.code != "ER_DUP_ENTRY")
					console.error(`SQLQueryError: ${err.sqlMessage}`)
				
				callback(err.code)
			} else {
				console.log(`borrower ${borrower.fname} ${borrower.lname} successfully registered!`)
				callback(null)
			}
		})
	}
}

exports.updating = async (borrower, callback) => {
	if (borrower) {
		const sql_update =`UPDATE Borrower SET FName = '${borrower.fname}', LName = '${borrower.lname}', Type_Of_Staff = '${borrower.typeOfStaff}', Designation = '${borrower.designation}' WHERE Borrower_ID = ${borrower.borrowerId};`
		
		await client.sendQuery(sql_update, (err, result) => {
			if(err) {
				if (err.code != "ER_DUP_ENTRY")
					console.error(`SQLQueryError: ${err.sqlMessage}`)
				
				callback(err.code)
			} else {
				if (result.affectedRows > 0) {
					console.log(`borrower ${borrower.fname} ${borrower.lname} successfully updated!`)
					callback(null)
				}
				else {
					callback("ZERO_ROWS_AFFECTED")
				}
			}
		})
	}
}

exports.getBorrowerdata = async (borrowerID, callback) => {
	if (borrowerID) {
		const sql_getBorrower = `SELECT * FROM Borrower WHERE Borrower_ID = ${borrowerID};`

		await client.sendQuery(sql_getBorrower, (err, result) => {
			if(err) {				
				callback(err.code, null)
			} else if (!err && result.length <= 1) {
				callback(null, result)
			} else {
				console.error(`Duplicate instance found on Borrower_ID ${borrowerID}`)
        		callback(`Multiple Borrowers found on Borrower_ID ${borrowerID}`, null)
			}
		})
	}
}