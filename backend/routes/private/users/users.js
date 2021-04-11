module.exports = function (app, connection) {
	// get all blogs of a particular user
	app.route(`/api/pub/users/:uid/blogs`)
		.get(function (req, res, next) {
			const uid = req.params.uid;
			connection.query(`SELECT * FROM whatcha.\`blogs-list\` WHERE \`uid\` = ${uid}`, (error, result, fields) => {
				res.header('Access-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
				if (error) { res.json(error); }
				else {
					res.json({
						error: false,
						data: result
					});
				}
			});
		});

	// app.post('/ap/pvt/users/:uid/:::');
}