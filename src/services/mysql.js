'use strict'

const config = require('../config')
const mysql = require('mysql')

const client = mysql.createConnection({
	host : config.db.host,
	user : config.db.user,
	password : config.db.password,
	multipleStatements : true
})

const sql = {
	database: {
		create: 'CREATE DATABASE IF NOT EXISTS Key_Management_System;',
		use: 'USE Key_Management_System;'
	},
	tables: {
		securityPerson:'CREATE TABLE IF NOT EXISTS Security_Person(Security_ID INT AUTO_INCREMENT PRIMARY KEY, Email VARCHAR(60) UNIQUE NOT NULL, Password VARCHAR(128) NOT NULL, FName VARCHAR(20) NOT NULL, LName VARCHAR(30) NOT NULL, Designation VARCHAR(20), Activation_Key CHAR(36) NOT NULL, Active BOOLEAN DEFAULT false, Role VARCHAR(5) DEFAULT "user");',
		keyDetail: 'CREATE TABLE IF NOT EXISTS Key_Detail(Key_ID INT PRIMARY KEY, No_Of_Keys INT NOT NULL, Availability BOOLEAN NOT NULL);',
		building: 'CREATE TABLE IF NOT EXISTS Building(Building_ID INT PRIMARY KEY, Building_Name VARCHAR(50) NOT NULL, Key_ID INT UNIQUE, FOREIGN KEY (Key_ID) REFERENCES Key_Detail (Key_ID)ON UPDATE CASCADE);',
		borrower: 'CREATE TABLE IF NOT EXISTS Borrower(Borrower_ID INT PRIMARY KEY, FName VARCHAR(20) NOT NULL, LName VARCHAR(30) NOT NULL, Type_Of_Staff VARCHAR(20) NOT NULL, Designation VARCHAR(20));',
		canAccess: 'CREATE TABLE IF NOT EXISTS Can_Access(Building_ID INT, Borrower_ID INT, PRIMARY KEY (Building_ID, Borrower_ID), FOREIGN KEY (Building_ID) REFERENCES Building (Building_ID) ON UPDATE CASCADE,FOREIGN KEY (Borrower_ID) REFERENCES Borrower(Borrower_ID) ON UPDATE CASCADE);',
		borrows: 'CREATE TABLE IF NOT EXISTS Borrows(Key_ID INT, Borrower_ID INT, Security_ID INT, Borrow_DateTime DATETIME, Status varchar(6), PRIMARY KEY (Key_ID, Borrower_ID, Security_ID, Borrow_DateTime), FOREIGN KEY (Key_ID) REFERENCES Key_Detail (Key_ID) ON UPDATE CASCADE, FOREIGN KEY (Borrower_ID) REFERENCES Borrower(Borrower_ID) ON UPDATE CASCADE, FOREIGN KEY (Security_ID) REFERENCES Security_Person (Security_ID) ON UPDATE CASCADE);'
	}
}

exports.connect = async () => {
  
// setting up the database connection
	await client.connect((err) => {
		if (err) {
			console.log(`Could not connect to Mysql because of ${err.code}`)
			process.exit(1)
		}
		// else
		// 	console.log('Mysql Connection is set.Waiting for DB configurations...')
	})

// Check whether the database is already exists. If not create it
	await client.query(sql.database.create, (err, results) => {
	  	if (err) {
	  		console.log(`Could not connect Database "Key_Management_System" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('DB Created')
	})

// Use created database
	await client.query(sql.database.use, (err, results) => {
	  	if (err) {
	  		console.log(`Could not use Database "Key_Management_System" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log(`Use database "Key_Management_System" as the default database for following quries`)
	})

// creat table Security_Person
	await client.query(sql.tables.securityPerson, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "Security_Person" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('Security_Person created')
	})

// creat table Key_Detail
	await client.query(sql.tables.keyDetail, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "Key_Detail" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('Key_Detail created')
	})

// creat table Building
	await client.query(sql.tables.building, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "Building" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('Building created')
	})

// creat table Borrower
	await client.query(sql.tables.borrower, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "Borrower" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('Borrower created')
	})

// creat table Can_Access
	await client.query(sql.tables.canAccess, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "Can_Access" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('Can_Access created')
	})

// creat table Borrows
	await client.query(sql.tables.borrows, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "Borrows" because of ${err.code}`)
			process.exit(1)
	  	}
	  	else
	  		// console.log('Borrows created')
	  		console.log("Application is ready to use")
	})
}

// We will use this to execute the sql queries 
exports.sendQuery = async (sql, callback) => {
	await client.query(sql, (err, results) => {
	  	if (err) {
	  		callback(err, null);
	  	} else {
	  		callback(null, results)
	  	}
	})
}


