const { v4: uuidv4 } = require('uuid');
const { Server } = require('socket.io');

module.exports = (server, connection) => {
    // const io = require('socket.io')(server, { cors: { origin: '*' } });
    const io = new Server(server, { cors: { origin: '*' } });

    const updateChatRoom = (chatRoomId, chatRoom) => {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE ' + process.env.DB_USER_DATABASE + '.`chat-rooms` SET ';
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
                else console.log('Chat Room updated!');
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
            'INSERT INTO ' + process.env.DB_USER_DATABASE + '.`chat-messages` (`messageId`, `chatRoomId`, `sender`, `receiver`, `text`, `time`, `received`, `seen`) values( ?, ?, ?, ?, ?, ?, ?, ?)',
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
                else console.log('Message posted!');
            }
        );
    };

    const getChatRoomFromSocket = async (socketId) => {
        let chatRoom = null;
        await connection.query(
            'SELECT * FROM ' + process.env.DB_USER_DATABASE + '.`chat-rooms` WHERE `socketOne` = ? OR `socketTwo` = ?',
            [socketId, socketId],
            function (error, result, fields) {
                if (error) console.log(error);
                else {
                    console.log('Got chat room from socket id!');
                    chatRoom = result;
                }
            }
        );
        return chatRoom;
    };

    // chatRoom : {chatRoomId, userOne, userTwo, socketOne, socketTwo, latestMessagId}

    io.on('connection', (socket) => {
        socket.on('join', ({ userId, chatRoomId }, callback) => {
            console.log('join', socket.id);

            const query = connection.query(
                'SELECT * FROM ' + process.env.DB_USER_DATABASE + '.`chat-rooms` WHERE `chatRoomId` = ?',
                [chatRoomId]
            );

            query.on('result', (chatRoom) => {
                console.log('chat Room received:', chatRoom.chatRoomId);

                if (
                    userId === chatRoom.userOne &&
                    socket.id !== chatRoom.socketOne
                ) {
                    chatRoom.socketOne = socket.id;
                    if (
                        chatRoom.socketTwo !== undefined &&
                        chatRoom.socketTwo !== null
                    )
                        io.to(chatRoom.socketTwo).emit(
                            'receiverAvailable',
                            socket.id
                        );
                } else if (
                    userId === chatRoom.userTwo &&
                    socket.id !== chatRoom.socketTwo
                ) {
                    chatRoom.socketTwo = socket.id;
                    if (
                        chatRoom.socketOne !== undefined &&
                        chatRoom.socketOne !== null
                    )
                        io.to(chatRoom.socketOne).emit(
                            'receiverAvailable',
                            socket.id
                        );
                }

                // push chatRoom to db
                updateChatRoom(chatRoom.chatRoomId, chatRoom);

                callback(chatRoom);
            });

            // getChatRoomFromId(chatRoomId).then((chatRoom) => {
            //     console.log('chat Room received:', chatRoom.chatRoomId);

            //     if (
            //         userId === chatRoom.userOne &&
            //         socket.id !== chatRoom.socketOne
            //     ) {
            //         chatRoom.socketOne = socket.id;
            //         if (
            //             chatRoom.socketTwo !== undefined &&
            //             chatRoom.socketTwo !== null
            //         )
            //             io.to(chatRoom.socketTwo).emit(
            //                 'receiverAvailable',
            //                 socket.id
            //             );
            //     } else if (
            //         userId === chatRoom.userTwo &&
            //         socket.id !== chatRoom.socketTwo
            //     ) {
            //         chatRoom.socketTwo = socket.id;
            //         if (
            //             chatRoom.socketOne !== undefined &&
            //             chatRoom.socketOne !== null
            //         )
            //             io.to(chatRoom.socketOne).emit(
            //                 'receiverAvailable',
            //                 socket.id
            //             );
            //     }

            //     // push chatRoom to db
            //     updateChatRoom(chatRoom.chatRoomId, chatRoom);

            //     callback(chatRoom);
            // });
        });

        // message: {chatRoomId, sender, receiver, receiverSocket, text, time}
        socket.on('sendMessage', ({ message }) => {
            const {
                chatRoomId,
                sender,
                receiver,
                receiverSocket,
                text,
            } = message;

            // construct message object
            const messageId = uuidv4();
            const messageObj = {
                messageId,
                chatRoomId,
                sender,
                receiver,
                text,
                time: new Date(),
                received: false,
                seen: false,
            };

            // check if the message has the socket of this user
            if (receiverSocket !== undefined) {
                console.log('receiverSocket', receiverSocket);
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

            const query = connection.query(
                'SELECT * FROM ' + process.env.DB_USER_DATABASE + '.`chat-rooms` WHERE `socketOne` = ? OR `socketTwo` = ?',
                [socket.id, socket.id]
            );

            query.on('result', (chatRoom) => {
                if (chatRoom) {
                    if (chatRoom.socketOne === socket.id)
                        chatRoom.socketOne = null;
                    else chatRoom.socketTwo = null;

                    updateChatRoom(chatRoom.chatRoomId, chatRoom);
                }
            });

            // const chatRoom = await getChatRoomFromSocket(socket.id);
            // if (chatRoom) {
            //     if (chatRoom.socketOne === socket.id) chatRoom.socketOne = null;
            //     else chatRoom.socketTwo = null;

            //     updateChatRoom(chatRoom);
            // }
        });
    });
};
