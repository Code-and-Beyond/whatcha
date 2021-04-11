const auth = require('../../../helpers/auth');

module.exports = function (app, connection) {


	//to get a the post by a user
	app.route('/api/pvt/post/:postId')
		.get(function (req, res, next) {
			const postId = req.params.postId;
			connection.query("SELECT * FROM whatcha.`posts-list` WHERE `uid` = ?", [postId],
				function (error, result, fields) {
					if (error) { res.sendStatus(500); }
					else {
						const access = auth.generateAccessToken({ name: req.params.username });
						const refresh = auth.generateRefreshToken({ name: req.params.username });
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({
							error: false,
							data: result,
							tokens: { access, refresh }
						});
					}
				}
			);
		});



	//to insert a post by a user
	app.route('/api/pvt/post')
		.post(function (req, res, nex) {
			const id = req.body.uid;
			const content = req.body.content;
			// const imgurl = req.body.imgUrl;
			const imgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDpa_UPKo0bPiXpwRFuSexsdj5lxVo-f1wwA&usqp=CAU";
			connection.query("INSERT INTO whatcha.`posts-list` (`uid`,`content`,`imgUrl`) values(?,?,?)", [id, content, imgUrl],
				function (error, result, fields) {
					if (error) {
						res.json(error);
					}
					else {
						const access = auth.generateAccessToken({ name: req.params.username });
						const refresh = auth.generateRefreshToken({ name: req.params.username });
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Post Successfully Created!", tokens: { access, refresh } });
					}
				});
		});


	//to update the post by a user (given postId)
	//1.edit the content 
	//2.edit the image 
	app.route('/api/pub/post/:postId')
		.put(function (req, res, next) {
			const computeUpdateQuery = () => {
				let queryString = "UPDATE whatcha.`posts-list` SET ";
				let queryArray = [];

				const updateColumn = (colName) => {
					if (req.body[colName] === undefined)
						return;

					queryString += `\`${colName}\` = ?, `;
					queryArray.push(req.body[colName]);
				};

				updateColumn("content");
				updateColumn("imgUrl");
				updateColumn("upvotes");
				updateColumn("comments");

				queryString = queryString.substring(0, queryString.length - 2);
				queryString += ` WHERE \`pid\` = ${req.params.postId}`;

				return { queryString, queryArray };
			};

			const args = computeUpdateQuery();

			connection.query(args.queryString, args.queryArray,
				function (error, result, fields) {
					if (error) { res.json(error); }
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({
							error: false,
							message: 'Post Successfully Updated!'
						});
					}
				}
			);
		});

	//to delete the post by a user
	app.route('/api/pvt/post/:postId')
		.delete(function (req, res, next) {
			const postId = req.params.postId;
			connection.query("DELETE FROM whatcha.`posts-list` WHERE `pid`= ? ", [postId],
				function (error, result, fields) {
					if (error) { res.sendStatus(500); }
					else {
						const access = auth.generateAccessToken({ name: req.params.username });
						const refresh = auth.generateRefreshToken({ name: req.params.username });
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Post Successfully Deleted!", tokens: { access, refresh } });
					}
				}
			);
		});



};