const { v4: uuidv4 } = require('uuid');

module.exports = function (app, connection) {
    // create a message
    app.route('/api/pub/messages').post(function (req, res, nex) {
        const {
            chatRoomId,
            sender,
            receiver,
            text,
            time,
            received,
            seen,
        } = req.body;
        const messageId = uuidv4();

        connection.query(
            'INSERT INTO "chat-messages" ("messageId", "chatRoomId", sender, receiver, text, time, received, seen) values($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                messageId,
                chatRoomId,
                sender,
                receiver,
                text,
                time,
                received,
                seen,
            ],
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
            'SELECT * FROM "chat-messages" WHERE "messageId" = $1',
            [messageId],
            function (error, result) {
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
                        data: result.rows,
                    });
                }
            }
        );
    });

    // update a message
    app.route('/api/pub/messages/:messageId').put(function (req, res, next) {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "chat-messages" SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
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
            queryString += ` WHERE "messageId" = $${queryArray.length + 1}`;
            queryArray.push(req.params.messageId);

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
            'DELETE FROM "chat-messages" WHERE "messageId" = $1',
            [messageId],
            function (error, result) {
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
            'UPDATE "chat-messages" SET "' +
                hideColName +
                '" = TRUE WHERE (sender = $1 AND receiver = $2) OR (sender = $2 AND receiver = $1)',
            [uid1, uid2],
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
                        message: 'Messages Successfully Updated!',
                    });
                }
            }
        );
    });
};
