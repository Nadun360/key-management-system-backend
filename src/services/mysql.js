'use strict'

const config = require('../config')
const mysql = require('mysql')

const client = mysql.createConnection({
	host : config.db.host,
	user : config.db.user,
	password : config.db.password,
	multipleStatements : true
})

exports.connect = async () => {
  
  	// setting up the database connection
	await client.connect((err) => {
		 // console.log('Mysql Connection is set.Waiting for DB configurations...')
		if (err) {
			console.log(`Could not connect to Mysql because of ${err.code}`)
			process.exit(1)
		}
	})

	// check whether the database is exists. if not create it
	var sql = 'CREATE DATABASE IF NOT EXISTS key_m_sys;USE key_m_sys;';
	await client.query(sql, (err, results) => {
		 // console.log('DB Connected')
	  	if (err) {
	  		console.log(`Could not connect Database because of ${err.code}`)
			process.exit(1)
	  	}
	})

	// creating users table
	var sql = 'CREATE TABLE IF NOT EXISTS users(ID INT AUTO_INCREMENT PRIMARY KEY, Email VARCHAR(50) UNIQUE NOT NULL, Password VARCHAR(128) NOT NULL, Name VARCHAR(50) NOT NULL, Activation_Key CHAR(36) UNIQUE, Active BOOLEAN DEFAULT false, Role VARCHAR(5) DEFAULT "user");'
	await client.query(sql, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table users because of ${err.code}`)
			process.exit(1)
	  	}
	  	console.log('DB Connected')
	})


}

exports.client = client

