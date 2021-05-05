const auth = require('../../../helpers/auth');
const { cloudinary } = require('../../../utils/cloudinary');

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
	app.route('/api/pub/post').post(async function (req, res, nex) {
		const id = req.body.uid;
		const content = req.body.content;
		const dateCreated = new Date();
		const fileStr = req.body.encodedImg;
		let uploadResponse;
		try {
			uploadResponse = await cloudinary.uploader.upload(fileStr);
		} catch (error) {
			console.log(error);
		}
		const imgUrl = uploadResponse.secure_url;
		connection.query(
			'INSERT INTO whatcha.`posts-list` (`uid`,`content`,`imgUrl`, `createdAt`) values(?,?,?,?)',
			[id, content, imgUrl, dateCreated],
			function (error, result, fields) {
				if (error) {
					res.json(error);
				} else {
					const access = auth.generateAccessToken({
						name: req.params.username,
					});
					const refresh = auth.generateRefreshToken({
						name: req.params.username,
					});
					res.header('Access-Control-Allow-Origin', '*');
					res.header(
						'Access-Control-Allow-Headers',
						'Origin, X-Requested-With, Content-Type, Accept'
					);
					res.json({
						error: false,
						message: 'Post Successfully Created!',
						tokens: { access, refresh },
					});
				}
			}
		);
	});

	// Save a post for a given user
	app.route('/api/pub/post/save')
		.post(function (req, res, nex) {
			const uid = req.body.uid;
			const pid = req.body.pid;
			const dateCreated = new Date();

			connection.query('INSERT INTO whatcha.`saved-posts` (`uid`,`pid`, `createdAt`) values(?,?,?)', [uid, pid, dateCreated],
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
							message: 'Post Successfully Saved!',
						});
					}
				}
			);
		});


	//to update the post by a user (given postId)
	app.route('/api/pub/post/:postId').put(function (req, res, next) {
		const computeUpdateQuery = () => {
			let queryString = 'UPDATE whatcha.`posts-list` SET ';
			let queryArray = [];

			const updateColumns = (colArray) => {
				for (let colName of colArray) {
					if (req.body[colName] === undefined) continue;

					queryString += `\`${colName}\` = ?, `;
					queryArray.push(req.body[colName]);
				}
			};

			updateColumns(['content', 'imgUrl', 'upvotes', 'comments']);

			queryString = queryString.substring(0, queryString.length - 2);
			queryString += ` WHERE \`pid\` = ${req.params.postId}`;

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
						message: 'Post Successfully Updated!',
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

	// remove saved post for a given user
	app.route('/api/pub/post/save')
		.delete(function (req, res, next) {
			const uid = req.body.uid;
			const postId = req.body.pid;

			connection.query("DELETE FROM whatcha.`saved-posts` WHERE `uid` = ? AND `pid`= ? ", [uid, postId],
				function (error, result, fields) {
					console.log(result);
					if (error) { res.sendStatus(500); }
					else {
						res.header('Access-Control-Allow-Origin', '*');
						res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
						res.json({ error: false, message: "Saved Post Successfully Removed!" });
					}
				}
			);
		});

};
