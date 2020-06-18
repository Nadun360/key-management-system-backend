require('dotenv/config');

module.exports = {
	app : process.env.APP,
	port : process.env.PORT,
	hostname : process.env.HOSTNAME,
	secretkey: process.env.SECRETKEY,
	mongo : {
		URI : process.env.MONGOURI
		// testURI :
	}
}