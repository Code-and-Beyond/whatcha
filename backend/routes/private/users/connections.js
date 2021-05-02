module.exports = function (app, connection) {
	// get all connections of a particular user
	app.route(`/api/pub/connection/:uid`)
		.get(function (req, res, next) {
			const uid = req.params.uid;
			connection.query('SELECT whatcha.`users`.*, whatcha.`users-info`.bio FROM whatcha.`user-connections` INNER JOIN whatcha.`users` ON whatcha.`user-connections`.uid2 = whatcha.`users`.id INNER JOIN whatcha.`users-info` ON whatcha.`users-info`.uid = whatcha.`user-connections`.uid2 WHERE whatcha.`user-connections`.uid1 = ?', [uid], (error, result, fields) => {
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

	// add a connection for a user
	app.route('/api/pub/connection/:uid1/:uid2')
		.post(function (req, res, next) {
			const uid1 = req.params.uid1;
			const uid2 = req.params.uid2;

			connection.query("INSERT INTO whatcha.`user-connections` (`uid1`,`uid2`) values(?,?)", [uid1, uid2],
				(error, result, fields) => {
					if (error) { res.json(error); }
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Connection Added!" });
					}
				});
		});

	// delete a connection for a user
	app.route('/api/pub/connection/:uid1/:uid2')
		.delete(function (req, res, next) {
			const uid1 = req.params.uid1;
			const uid2 = req.params.uid2;

			connection.query("DELETE FROM whatcha.`user-connections` WHERE `uid1`= ? AND `uid2` = ? ", [uid1, uid2],
				(error, result, fields) => {
					if (error) { res.json(error); }
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Connection Deleted!" });
					}
				});
		});
}