module.exports = function (app, connection) {
	// create a message
	app.route('/api/pub/messages').post(function (req, res, nex) {
		// const messageId = req.body.messageId;
		const {
			chatRoomId,
			sender,
			receiver,
			text,
			time,
			received,
			seen,
		} = req.body;

		connection.query(
			'INSERT INTO whatcha.`chat-messages` (`messageId`, `chatRoomId`, `sender`, `receiver`, `text`, `time`, `received`, `seen`) values(UUID(), ?, ?, ?, ?, ?, ?, ?)',
			[chatRoomId, sender, receiver, text, time, received, seen],
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
						message: 'Message Successfully Created!',
					});
				}
			}
		);
	});

	// get a message
	app.route('/api/pub/messages/:messageId').get(function (req, res, next) {
		const { messageId } = req.params;
		connection.query(
			'SELECT * FROM whatcha.`chat-messages` WHERE `messageId` = ?',
			[messageId],
			function (error, result, fields) {
				res.header('Access-Control-Allow-Origin', '*');
				res.header(
					'Access-Control-Allow-Headers',
					'Origin, X-Requested-With, Content-Type, Accept'
				);
				if (error) {
					res.sendStatus(500);
				} else {
					res.json({
						error: false,
						data: result,
					});
				}
			}
		);
	});

	// update a message
	app.route('/api/pub/messages/:messageId').put(function (req, res, next) {
		const computeUpdateQuery = () => {
			let queryString = 'UPDATE whatcha.`chat-messages` SET ';
			let queryArray = [];

			const updateColumns = (colArray) => {
				for (let colName of colArray) {
					if (req.body[colName] === undefined) continue;

					queryString += `\`${colName}\` = ?, `;
					queryArray.push(req.body[colName]);
				}
			};

			updateColumns([
				'chatRoomId',
				'sender',
				'receiver',
				'text',
				'time',
				'received',
				'seen',
			]);

			queryString = queryString.substring(0, queryString.length - 2);
			queryString += ` WHERE \`messageId\` = ?`;
			queryArray.push(req.params.messageId);

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
						message: 'Message Successfully Updated!',
					});
				}
			}
		);
	});

	// delete a message
	app.route('/api/pub/messages/:messageId').delete(function (req, res, next) {
		const { messageId } = req.params;
		connection.query(
			'DELETE FROM whatcha.`chat-messages` WHERE `messageId`= ? ',
			[messageId],
			function (error, result, fields) {
				res.header('Access-Control-Allow-Origin', '*');
				res.header(
					'Access-Control-Allow-Headers',
					'Origin, X-Requested-With, Content-Type, Accept'
				);
				if (error) {
					res.sendStatus(500);
				} else {
					res.json({
						error: false,
						message: 'Message Successfully Deleted!',
					});
				}
			}
		);
	});

	// hide messages of a particular chat room for a user
	app.route('/api/pub/messages').put(function (req, res, next) {
		let { uid1, uid2, hideFor } = req.body;
		if (uid1 > uid2) [uid1, uid2] = [uid2, uid1];

		let hideColName = null;
		if (hideFor === uid1) hideColName = `userOneHide`;
		else hideColName = `userTwoHide`;

		connection.query(
			'UPDATE whatcha.`chat-messages` SET ' +
			hideColName +
			' = 1 WHERE (`sender` = ? AND `receiver` = ?) OR (`sender` = ? AND `receiver` = ?)',
			[uid1, uid2, uid2, uid1],
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
						message: 'Messages Successfully Updated!',
					});
				}
			}
		);
	});
};
