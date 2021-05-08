module.exports = function (app, connection) {
	// create chat room
	app.route('/api/pub/chat').post(function (req, res, next) {
		let { userOne, userTwo } = req.body;
		if (userOne > userTwo) [userOne, userTwo] = [userTwo, userOne];
		const connectionExists = true;
		connection.query(
			'INSERT INTO ' + process.env.DB_USER_DATABASE + '.`chat-rooms` (`chatRoomId`, `userOne`, `userTwo`, `connectionExists`) values (UUID(), ?, ?, ?)',
			[userOne, userTwo, connectionExists],
			function (error, result, fields) {
				res.header('Access-Control-Allow-Origin', '*');
				res.header(
					'Access-Control-Allow-Headers',
					'Origin, X-Requested-With, Content-Type, Accept'
				);
				if (error) {
					res.sendStatus(500);
					// res.json(error);
				} else {
					res.json({
						error: false,
						message: 'Chat Room Successfully Created!',
					});
				}
			}
		);
	});

	// get chat rooms for given user
	app.route('/api/pub/chat').get(function (req, res, next) {
		const { uid } = req.query;
		connection.query(
			'SELECT ' + process.env.DB_USER_DATABASE + '.`chat-rooms`.*, ' + process.env.DB_USER_DATABASE + '.`users`.image, ' + process.env.DB_USER_DATABASE + '.`users`.fullname, ' + process.env.DB_USER_DATABASE + '.`users`.id, ' + process.env.DB_USER_DATABASE + '.`chat-messages`.sender, ' + process.env.DB_USER_DATABASE + '.`chat-messages`.receiver, ' + process.env.DB_USER_DATABASE + '.`chat-messages`.`text`, ' + process.env.DB_USER_DATABASE + '.`chat-messages`.`time`, ' + process.env.DB_USER_DATABASE + '.`chat-messages`.received, ' + process.env.DB_USER_DATABASE + '.`chat-messages`.seen, ' + process.env.DB_USER_DATABASE + '.`chat-messages`.userOneHide, ' + process.env.DB_USER_DATABASE + '.`chat-messages`.userTwoHide FROM ' + process.env.DB_USER_DATABASE + '.`chat-rooms` INNER JOIN ' + process.env.DB_USER_DATABASE + '.`users` ON ' + process.env.DB_USER_DATABASE + '.`chat-rooms`.userTwo = ' + process.env.DB_USER_DATABASE + '.`users`.id OR ' + process.env.DB_USER_DATABASE + '.`chat-rooms`.userOne = ' + process.env.DB_USER_DATABASE + '.`users`.id INNER JOIN ' + process.env.DB_USER_DATABASE + '.`chat-messages` ON ' + process.env.DB_USER_DATABASE + '.`chat-rooms`.latestMessageId = ' + process.env.DB_USER_DATABASE + '.`chat-messages`.messageId WHERE (' + process.env.DB_USER_DATABASE + '.`chat-rooms`.userOne = ? OR ' + process.env.DB_USER_DATABASE + '.`chat-rooms`.userTwo = ?) AND ' + process.env.DB_USER_DATABASE + '.`users`.id != ? ORDER BY ' + process.env.DB_USER_DATABASE + '.`chat-messages`.time DESC',
			[uid, uid, uid],
			function (error, result, fields) {
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

	// get chat room
	app.route('/api/pub/chat/:chatRoomId').get(function (req, res, next) {
		const { chatRoomId } = req.params;
		connection.query(
			'SELECT * FROM ' + process.env.DB_USER_DATABASE + '.`chat-rooms` WHERE `chatRoomId` = ?',
			[chatRoomId],
			function (error, result, fields) {
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

	// update a chat room using chat room Id
	app.route('/api/pub/chat/:chatRoomId').put(function (req, res, next) {
		const computeUpdateQuery = () => {
			let queryString = 'UPDATE ' + process.env.DB_USER_DATABASE + '.`chat-rooms` SET ';
			let queryArray = [];

			const updateColumns = (colArray) => {
				for (let colName of colArray) {
					if (req.body[colName] === undefined) continue;

					queryString += `\`${colName}\` = ?, `;
					queryArray.push(req.body[colName]);
				}
			};

			updateColumns([
				'socketOne',
				'socketTwo',
				'connectionExists',
				'latestMessageId',
			]);

			queryString = queryString.substring(0, queryString.length - 2);
			queryString += ` WHERE \`chatRoomId\` = ?`;
			queryArray.push(req.params.chatRoomId);

			return { queryString, queryArray };
		};

		const args = computeUpdateQuery();

		connection.query(
			args.queryString,
			args.queryArray,
			function (error, result, fields) {
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
						message: 'Post Successfully Updated!',
					});
				}
			}
		);
	});

	// update a chat room using user Ids
	app.route('/api/pub/chat').put(function (req, res, next) {
		let { userOne, userTwo } = req.query;
		if (userOne > userTwo) [userOne, userTwo] = [userTwo, userOne];
		const computeUpdateQuery = () => {
			let queryString = 'UPDATE ' + process.env.DB_USER_DATABASE + '.`chat-rooms` SET ';
			let queryArray = [];

			const updateColumns = (colArray) => {
				for (let colName of colArray) {
					if (req.body[colName] === undefined) continue;

					queryString += `\`${colName}\` = ?, `;
					queryArray.push(req.body[colName]);
				}
			};

			updateColumns([
				'socketOne',
				'socketTwo',
				'connectionExists',
				'latestMessageId',
			]);

			queryString = queryString.substring(0, queryString.length - 2);
			queryString += ` WHERE \`userOne\` = ? AND \`userTwo\` = ?`;
			queryArray.push(userOne, userTwo);

			return { queryString, queryArray };
		};

		const args = computeUpdateQuery();
		console.log(args.queryString);
		console.log(args.queryArray);

		connection.query(
			args.queryString,
			args.queryArray,
			function (error, result, fields) {
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
						message: 'Chat room Successfully Updated!',
					});
				}
			}
		);
	});

	// delete a chat room
	app.route('/api/pub/chat/:chatRoomId').delete(function (req, res, next) {
		const { chatRoomId } = req.params;
		connection.query(
			'DELETE FROM ' + process.env.DB_USER_DATABASE + '.`chat-rooms` WHERE `chatRoomId`= ? ',
			[chatRoomId],
			function (error, result, fields) {
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
						message: 'Post Successfully Deleted!',
					});
				}
			}
		);
	});

	// get chat messages of a chat room
	app.route('/api/pub/chat/:chatRoomId/messages').get(function (
		req,
		res,
		next
	) {
		const { chatRoomId } = req.params;
		connection.query(
			'SELECT * FROM ' + process.env.DB_USER_DATABASE + '.`chat-messages` WHERE `chatRoomId` = ? ORDER BY `time`',
			[chatRoomId],
			function (error, result, fields) {
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
};
