module.exports = function (app, connection) {
	// get all connections of a particular user
	app.route(`/api/pub/connection/:uid`).get(function (req, res, next) {
		const { uid } = req.params;
		connection.query(
			'SELECT ' + process.env.DB_USER_DATABASE + '.`users-info`.*, ' + process.env.DB_USER_DATABASE + '.`users`.id, ' + process.env.DB_USER_DATABASE + '.`users`.fullname, ' + process.env.DB_USER_DATABASE + '.`users`.image, ' + process.env.DB_USER_DATABASE + '.`users`.username FROM ' + process.env.DB_USER_DATABASE + '.`user-connections` INNER JOIN ' + process.env.DB_USER_DATABASE + '.`users-info` INNER JOIN ' + process.env.DB_USER_DATABASE + '.`users` ON (' + process.env.DB_USER_DATABASE + '.`user-connections`.uid1 = ? OR ' + process.env.DB_USER_DATABASE + '.`user-connections`.uid2 = ?) AND ' + process.env.DB_USER_DATABASE + '.`users`.id != ? AND (' + process.env.DB_USER_DATABASE + '.`user-connections`.uid1 = ' + process.env.DB_USER_DATABASE + '.`users-info`.uid OR ' + process.env.DB_USER_DATABASE + '.`user-connections`.uid2 = ' + process.env.DB_USER_DATABASE + '.`users-info`.uid) AND ' + process.env.DB_USER_DATABASE + '.`users`.id = ' + process.env.DB_USER_DATABASE + '.`users-info`.uid;',
			[uid, uid, uid],
			(error, result, fields) => {
				res.header('Access-Control-Allow-Origin', '*');
				res.header(
					'Access-Control-Allow-Headers',
					'Origin, X-Requested-With, Content-Type, Accept'
				);
				if (error) {
					res.json(error);
				} else {
					res.json({
						error: false,
						data: result,
					});
				}
			}
		);
	});

	// add a connection for a user
	app.route('/api/pub/connection/:uid1/:uid2').post(function (
		req,
		res,
		next
	) {
		let { uid1, uid2 } = req.params;
		if (uid1 > uid2) [uid1, uid2] = [uid2, uid1];
		connection.query(
			'INSERT INTO ' + process.env.DB_USER_DATABASE + '.`user-connections` (`uid1`,`uid2`) values(?,?)',
			[uid1, uid2],
			(error, result, fields) => {
				if (error) {
					res.json(error);
				} else {
					res.header('Access-Control-Allow-Origin', '*');
					res.header(
						'Access-Control-Allow-Headers',
						'Origin, X-Requested-With, Content-Type, Accept'
					);
					res.json({ error: false, message: 'Connection Added!' });
				}
			}
		);
	});

	// delete a connection for a user
	app.route('/api/pub/connection/:uid1/:uid2').delete(function (
		req,
		res,
		next
	) {
		let { uid1, uid2 } = req.params;
		if (uid1 > uid2) [uid1, uid2] = [uid2, uid1];
		connection.query(
			'DELETE FROM ' + process.env.DB_USER_DATABASE + '.`user-connections` WHERE `uid1`= ? AND `uid2` = ? ',
			[uid1, uid2],
			(error, result, fields) => {
				if (error) {
					res.json(error);
				} else {
					res.header('Access-Control-Allow-Origin', '*');
					res.header(
						'Access-Control-Allow-Headers',
						'Origin, X-Requested-With, Content-Type, Accept'
					);
					res.json({ error: false, message: 'Connection Deleted!' });
				}
			}
		);
	});
};
