module.exports = function (app, connection) {


	//to insert a post by a user
	app.route('/api/pub/post')
		.post(function (req, res, nex) {
			const id = req.body.uid;
			const content = req.body.content;
			const upvotes = req.body.upvotes;
			const comment = req.body.comments;
			const imgurl = req.body.imgUrl;
			connection.query("INSERT INTO whatcha.`posts-list` (`uid`,`content`,`upvotes`,`comments`,`imgUrl`) values(?,?,?,?,?)", [id, content, upvotes, comment, imgurl],
				function (error, result, fields) {
					if (error) res.json(error);
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Category Created" });
					}
				});
		});


	//to get all the posts by a user(done)
	app.route('/api/pub/post/:query')
		.get(function (req, res, next) {
			const query = req.params.query;
			connection.query("SELECT * FROM whatcha.`posts-list` WHERE `uid` LIKE ? ", ["%" + query + "%"],
				function (error, result, fields) {
					if (error) { res.sendStatus(500); }
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({
							error: false,
							data: result
						});
					}
				}
			);
		});



}