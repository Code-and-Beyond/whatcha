module.exports = function (app, connection) {
	// get all blogs of a particular user
	app.route(`/api/pub/users/:uid/blogs`)
		.get(function (req, res, next) {
			const uid = req.params.uid;
			connection.query(`SELECT * FROM ' + process.env.DB_USER_DATABASE + '.\`blogs-list\` WHERE \`uid\` = ${uid}`, (error, result, fields) => {
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


	// get all posts id for a particular user-id
	app.route(`/api/pub/users/upvote/:uid`)
		.get(function (req, res, next) {
			const uid = req.params.uid;
			connection.query('SELECT pid FROM ' + process.env.DB_USER_DATABASE + '.`user-upvotes` WHERE `uid` = ?', [uid], (error, result, fields) => {
				if (error) { res.json(error); }
				else {
					res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
					res.header('Access-Control-Allow-Origin', '*');
					res.json({
						error: false,
						data: result
					});
				}
			});
		});


	app.route(`/api/pub/users/profile/:uid`)
		.get(function (req, res, next) {
			const uid = req.params.uid;
			connection.query('SELECT * FROM ' + process.env.DB_USER_DATABASE + '.`users-info` WHERE `uid` = ?', [uid], (error, result, fields) => {
				if (error) { res.json(error); }
				else {
					res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
					res.header('Access-Control-Allow-Origin', '*');
					res.json({
						error: false,
						data: result
					});
				}
			});
		});


	app.route(`/api/pub/allUsers`)
		.get(function (req, res, next) {
			const uid = req.params.uid;
			connection.query('SELECT ' + process.env.DB_USER_DATABASE + '.`users`.* ,' + process.env.DB_USER_DATABASE + '.`users-info`.bio FROM ' + process.env.DB_USER_DATABASE + '.`users` INNER JOIN ' + process.env.DB_USER_DATABASE + '.`users-info` ON ' + process.env.DB_USER_DATABASE + '.`users-info`.uid = ' + process.env.DB_USER_DATABASE + '.`users`.id', (error, result, fields) => {
				if (error) { res.json(error); }
				else {
					res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
					res.header('Access-Control-Allow-Origin', '*');
					res.json({
						error: false,
						data: result
					});
				}
			});
		});


	// increase upvote of an post
	app.route('/api/pub/users/upvote/:uid/:pid')
		.post(function (req, res, next) {
			const uid = req.params.uid;
			const pid = req.params.pid;
			const dateUpvoted = new Date();

			connection.query('INSERT INTO ' + process.env.DB_USER_DATABASE + '.`user-upvotes` (`uid`,`pid`,`createdAt`) values(?,?,?)', [uid, pid, dateUpvoted],
				(error, result, fields) => {
					if (error) { res.json(error); }
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Upvote Added!" });
					}
				});
		});

	app.route('/api/pub/users/profile/:uid')
		.put(function (req, res, next) {
			console.log(req.body, req.params);
			const computeUpdateQuery = () => {
				let queryString = 'UPDATE ' + process.env.DB_USER_DATABASE + '.`users-info` SET ';
				let queryArray = [];

				const updateColumns = (colArray) => {
					for (let colName of colArray) {
						if (req.body[colName] === undefined) continue;

						queryString += `\`${colName}\` = ?, `;
						queryArray.push(req.body[colName]);
					}
				};

				updateColumns(['bio', 'location', 'organization', 'website']);

				queryString = queryString.substring(0, queryString.length - 2);
				queryString += ` WHERE \`uid\` = ?`;
				queryArray.push(req.params.uid);


				return { queryString, queryArray };
			};

			const args = computeUpdateQuery();

			connection.query(
				args.queryString,
				args.queryArray,
				function (error, result, fields) {
					if (error) {
						res.json(error);
					} else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header(
							'Access-Control-Allow-Headers',
							'Origin, X-Requested-With, Content-Type, Accept'
						);
						res.json({
							error: false,
							message: 'Profile Successfully Updated!',
						});
					}
				}
			);
		});

	// decrease upvote of an post
	app.route('/api/pub/users/upvote/:uid/:pid')
		.delete(function (req, res, next) {
			const uid = req.params.uid;
			const pid = req.params.pid;

			connection.query('DELETE FROM ' + process.env.DB_USER_DATABASE + '.`user-upvotes` WHERE `uid`= ? AND `pid` = ? ', [uid, pid],
				(error, result, fields) => {
					if (error) { res.json(error); }
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Upvote Deleted!" });
					}
				});
		});
}