'use strict'

const client = require('../services/mysql')
// const APIError = require('../utils/APIError')

exports.registering = async (user, callback) => {
  if (user) {
    // sql query to register a user
    const sql_regi = `INSERT INTO users (Email, Name, Password, Activation_Key) VALUES ('${user.email}', '${user.name}', '${user.password}', '${user.activation_key}')`
    
    // executing the query
    await client.sendQuery(sql_regi, (err, result) => {
      if(err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
        callback(err.code)
      } else {
        console.log(`${user.email} was successfully registered!`)
        callback(null)
      }
    })
  }
}

exports.findUser = async (email, callback) => {
  if (email) {
    // sql query to find a user
    const sql_find = `SELECT * FROM users WHERE Email = '${email}'`

    // executing the query
    await client.sendQuery(sql_find, (err, result) => {
      // Requested user not found
      if (err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
        callback(err.code, null)
        // If the requested user is there or not 
      } else if (!err && result.length <= 1) {
        callback(null, result)
        // Multiple user have registered using same email
      } else {
        console.error(`Duplicate instance found on ${email}`)
        callback('Multiple users found', null)
      }
    })
  }
}