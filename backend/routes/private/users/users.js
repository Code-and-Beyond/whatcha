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


	// get all posts id for a particular user-id
	app.route(`/api/pub/users/upvote/:uid`)
		.get(function (req, res, next) {
			const uid = req.params.uid;
			connection.query('SELECT pid FROM whatcha.`user-upvotes` WHERE `uid` = ?', [uid], (error, result, fields) => {
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

			connection.query("INSERT INTO whatcha.`user-upvotes` (`uid`,`pid`) values(?,?)", [uid, pid],
				(error, result, fields) => {
					if (error) { res.json(error); }
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Upvote Added!" });
					}
				});
		});

	// decrease upvote of an post
	app.route('/api/pub/users/upvote/:uid/:pid')
		.delete(function (req, res, next) {
			const uid = req.params.uid;
			const pid = req.params.pid;

			connection.query("DELETE FROM whatcha.`user-upvotes` WHERE `uid`= ? AND `pid` = ? ", [uid, pid],
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