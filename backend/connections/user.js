const mysql = require('mysql')

let userConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASS
})

userConnection.connect(function (err) {
	if (err) {
		console.error('Error connecting: ' + err.stack)
		return
	}
})

module.exports = userConnection
