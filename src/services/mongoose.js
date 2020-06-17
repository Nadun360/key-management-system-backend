'use strict'

const config = require('../config')
const promise = require('bluebird')
const MongoClient = promise.promisifyAll(require('mongodb').MongoClient);
const client = new MongoClient(config.mongo.URI, { useNewUrlParser: true, useUnifiedTopology: true });

exports.connect = async () => {
  
	try {
		// Connect to the MongoDB cluster
		await client.connect()
		console.log('MongoDB is connected')
	} catch (e) {
		console.error(e)
		await client.close();
	    process.exit(1)
	}

	// This has to be clarified from someone whos's koow This
	// MongoClient.connectAsync(config.mongo.URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (db) {
	//     console.log(db);
	// }).catch(function(err){
	//     //handle error
	//     console.log(err);
	// });
}

