module.exports = function (app, connection) {

	app.route('/api/pub/posts')
		.get(function (req, res, next) {
			connection.query('SELECT `posts-list`.pid, `posts-list`.content, `posts-list`.imgUrl, `posts-list`.upvotes, `posts-list`.comments, `posts-list`.createdAt, `users`.fullname, `users`.username, `users`.image  FROM whatcha.`posts-list` INNER JOIN whatcha.`users` ON whatcha.`posts-list`.uid = whatcha.`users`.id ORDER BY `createdAt` DESC', (error, result, fields) => {
				if (error) { res.sendStatus(500); }
				else {
					res.header('Access-Control-Allow-Origin', '*');
					res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
					res.json({
						error: false,
						data: result
					});
				}
			});
		});

	app.route('/api/pub/posts/trending')
		.get(function (req, res, next) {
			connection.query('SELECT `posts-list`.pid, `posts-list`.content, `posts-list`.imgUrl, `posts-list`.upvotes, `posts-list`.comments, `posts-list`.createdAt, `users`.fullname, `users`.username, `users`.image  FROM whatcha.`posts-list` INNER JOIN whatcha.`users` ON whatcha.`posts-list`.uid = whatcha.`users`.id WHERE whatcha.`posts-list`.upvotes >= 10 ORDER BY `upvotes` DESC', (error, result, fields) => {
				if (error) { res.sendStatus(500); }
				else {
					res.header('Access-Control-Allow-Origin', '*');
					res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
					res.json({
						error: false,
						data: result
					});
				}
			});
		});

	app.route(`/api/pub/posts/saved/:uid`)
		.get(function (req, res, next) {
			const uid = req.params.uid;
			connection.query('SELECT `saved-posts`.pid from whatcha.`saved-posts` WHERE `uid` = ?', [uid], (error, result, fields) => {
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
}