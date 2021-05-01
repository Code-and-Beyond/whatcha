const { v4: uuidv4 } = require('uuid');
const { Server } = require('socket.io');

module.exports = (server, connection) => {
    // const io = require('socket.io')(server, { cors: { origin: '*' } });
    const io = new Server(server, { cors: { origin: '*' } });

    const updateChatRoom = (chatRoomId, chatRoom) => {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE whatcha.`chat-rooms` SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (chatRoom[colName] === undefined) continue;

                    queryString += `\`${colName}\` = ?, `;
                    queryArray.push(chatRoom[colName]);
                }
            };

            updateColumns([
                'userOne',
                'socketOne',
                'userTwo',
                'socketTwo',
                'connectionExists',
                'latestMessageId',
            ]);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE \`chatRoomId\` = ?`;
            queryArray.push(chatRoomId);

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();

        connection.query(
            args.queryString,
            args.queryArray,
            function (error, result, fields) {
                if (error) console.log(error);
                else console.log('success');
            }
        );
    };

    const postMessage = (message) => {
        const {
            messageId,
            chatRoomId,
            sender,
            receiver,
            text,
            time,
            received,
            seen,
        } = message;

        connection.query(
            'INSERT INTO whatcha.`chat-messages` (`messageId`, `chatRoomId`, `sender`, `receiver`, `text`, `time`, `received`, `seen`) values( ?, ?, ?, ?, ?, ?, ?, ?)',
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
            function (error, result, fields) {
                if (error) console.log(error);
                else console.log('success');
            }
        );
    };

    const getChatRoomFromSocket = (socketId) => {
        connection.query(
            'SELECT * FROM whatcha.`chat-rooms` WHERE `socketOne` = ? OR `socketTwo` = ?',
            [socketId, socketId],
            function (error, result, fields) {
                if (error) console.log(error);
                else console.log('success');
            }
        );
    };

    io.on('connection', (socket) => {
        socket.on('join', ({ userId, chatRoom }, callback) => {
            // console.log('join', socket.id);

            if (
                userId === chatRoom.userOne &&
                socket.id !== chatRoom.socketOne
            ) {
                chatRoom.socketOne = socket.id;
            } else if (
                userId === chatRoom.userTwo &&
                socket.id !== chatRoom.socketTwo
            ) {
                chatRoom.socketTwo = socket.id;
            }

            // push chatRoom to db
            updateChatRoom(chatRoom.chatRoomId, chatRoom);

            callback(chatRoom);
        });

        // message: {chatRoomId, sender, receiver, receiverSocket, text, time}
        socket.on('sendMessage', ({ message }) => {
            const {
                chatRoomId,
                sender,
                receiver,
                receiverSocket,
                text,
                time,
            } = message;

            // construct message object
            const messageId = uuidv4();
            const messageObj = {
                messageId,
                chatRoomId,
                sender,
                receiver,
                text,
                time,
                received: false,
                seen: false,
            };

            // check if the message has the socket of this user
            if (receiverSocket !== undefined) {
                io.to(receiverSocket).emit('message', {
                    ...messageObj,
                    received: true,
                });
            }

            // push this message to the db
            postMessage(messageObj);

            // update the chatRoom
            updateChatRoom(chatRoomId, { latestMessageId: messageId });

            socket.emit('message', messageObj);
        });

        socket.on('disconnect', async (reason) => {
            console.log('disconnect', socket.id);

            const chatRoom = await getChatRoomFromSocket(socket.id);
            if (chatRoom.socketOne === socket.id) chatRoom.socketOne = null;
            else chatRoom.socketTwo = null;

            updateChatRoom(chatRoom);
        });
    });
};
