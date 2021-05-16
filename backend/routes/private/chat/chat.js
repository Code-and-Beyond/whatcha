const { v4: uuidv4 } = require('uuid');

module.exports = function (app, connection) {
    // create chat room
    app.route('/api/pub/chat').post(function (req, res, next) {
        let { userOne, userTwo } = req.body;
        if (userOne > userTwo) [userOne, userTwo] = [userTwo, userOne];
        const chatRoomId = uuidv4();
        const connectionExists = true;

        connection.query(
            'INSERT INTO "chat-rooms" ("chatRoomId", "userOne", "userTwo", "connectionExists") values ($1, $2, $3, $4)',
            [chatRoomId, userOne, userTwo, connectionExists],
            function (error, result) {
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
            'SELECT "chat-rooms".*, users.image, users.fullname, users.id, "chat-messages".sender, "chat-messages".receiver, "chat-messages".text, "chat-messages".time, "chat-messages".received, "chat-messages".seen, "chat-messages"."userOneHide", "chat-messages"."userTwoHide" FROM "chat-rooms" INNER JOIN users ON "chat-rooms"."userTwo" = users.id OR "chat-rooms"."userOne" = users.id INNER JOIN "chat-messages" ON "chat-rooms"."latestMessageId" = "chat-messages"."messageId" WHERE ("chat-rooms"."userOne" = $1 OR "chat-rooms"."userTwo" = $1) AND users.id != $1 ORDER BY "chat-messages".time DESC',
            [uid],
            function (error, result) {
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
                        data: result.rows,
                    });
                }
            }
        );
    });

    // get chat room
    app.route('/api/pub/chat/:chatRoomId').get(function (req, res, next) {
        const { chatRoomId } = req.params;
        connection.query(
            'SELECT * FROM "chat-rooms" WHERE "chatRoomId" = $1',
            [chatRoomId],
            function (error, result) {
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
                        data: result.rows,
                    });
                }
            }
        );
    });

    // update a chat room using chat room Id
    app.route('/api/pub/chat/:chatRoomId').put(function (req, res, next) {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "chat-rooms" SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
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
            queryString += ` WHERE "chatRoomId" = $${queryArray.length + 1}`;
            queryArray.push(req.params.chatRoomId);

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();

        connection.query(
            args.queryString,
            args.queryArray,
            function (error, result) {
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
            let queryString = 'UPDATE "chat-rooms" SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
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
            queryString += ` WHERE "userOne" = $${
                queryArray.length + 1
            } AND "userTwo" = $${queryArray.length + 2}`;
            queryArray.push(userOne, userTwo);

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();

        connection.query(
            args.queryString,
            args.queryArray,
            function (error, result) {
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
            'DELETE FROM "chat-rooms" WHERE "chatRoomId" = $1',
            [chatRoomId],
            function (error, result) {
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
            'SELECT * FROM "chat-messages" WHERE "chatRoomId" = $1 ORDER BY time',
            [chatRoomId],
            function (error, result) {
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
                        data: result.rows,
                    });
                }
            }
        );
    });
};
