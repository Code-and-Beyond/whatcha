module.exports = function (app, connection) {
    // create chat room
    app.route('/api/pub/chat').post(function (req, res, next) {
        const userOne = req.body.userOne;
        const userTwo = req.body.userTwo;
        const connectionExists = true;
        connection.query(
            'INSERT INTO whatcha.`chat-rooms` (`chatRoomId`, `userOne`, `userTwo`, `connectionExists`) values (UUID(), ?, ?, ?)',
            [userOne, userTwo, connectionExists],
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
                        message: 'Chat Room Successfully Created!',
                    });
                }
            }
        );
    });

    // get chat room Id from user Id
    app.route('/api/pub/chat').get(function (req, res, next) {
        const uid = req.query.uid;
        connection.query(
            'SELECT * FROM whatcha.`chat-rooms` WHERE `userOne` = ? OR `userTwo` = ?',
            [uid, uid],
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
        const chatRoomId = req.params.chatRoomId;
        connection.query(
            'SELECT * FROM whatcha.`chat-rooms` WHERE `chatRoomId` = ?',
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

    // update a chat room
    app.route('/api/pub/chat/:chatRoomId').put(function (req, res, next) {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE whatcha.`chat-rooms` SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `\`${colName}\` = ?, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns([
                'userOne',
                'userTwo',
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

    // delete a chat room
    app.route('/api/pub/chat/:chatRoomId').delete(function (req, res, next) {
        const chatRoomId = req.params.chatRoomId;
        connection.query(
            'DELETE FROM whatcha.`chat-rooms` WHERE `chatRoomId`= ? ',
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
        const chatRoomId = req.params.chatRoomId;
        connection.query(
            'SELECT * FROM whatcha.`chat-messages` WHERE `chatRoomId` = ?',
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