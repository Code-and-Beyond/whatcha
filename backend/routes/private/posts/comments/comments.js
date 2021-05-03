module.exports = function (app, connection) {
    // create comment
    app.route('/api/pub/posts/:postId/comments').post(function (
        req,
        res,
        next
    ) {
        const { postId } = req.params;
        const { uid, text } = req.body;
        const createdAt = new Date();
        connection.query(
            'INSERT INTO whatcha.`posts-comments` (`commentId`, `pid`, `uid`, `text`, `createdAt`) values (UUID(), ?, ?, ?, ?)',
            [postId, uid, text, createdAt],
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
                        message: 'Comment Successfully Created!',
                    });
                }
            }
        );
    });

    // get comments of a particular post
    app.route('/api/pub/posts/:postId/comments').get(function (req, res, next) {
        const { postId } = req.params;
        connection.query(
            'SELECT whatcha.`posts-comments`.*, whatcha.`users`.fullname, whatcha.`users`.image, whatcha.`users-info`.bio FROM whatcha.`posts-comments` INNER JOIN whatcha.`users` INNER JOIN whatcha.`users-info` ON whatcha.`posts-comments`.uid = whatcha.`users`.id AND whatcha.`users-info`.uid = whatcha.`users`.id WHERE `pid` = ? ORDER BY createdAt DESC',
            [postId],
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

    // update comment
    app.route('/api/pub/posts/comments/:commentId').put(function (
        req,
        res,
        next
    ) {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE whatcha.`posts-comments` SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `\`${colName}\` = ?, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['text', 'likesCount']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE \`commentId\` = ?`;
            queryArray.push(req.params.commentId);

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
                        message: 'Comment Successfully Updated!',
                    });
                }
            }
        );
    });

    // delete comment
    app.route('/api/pub/posts/comments/:commentId').delete(function (
        req,
        res,
        next
    ) {
        const { commentId } = req.params;
        connection.query(
            'DELETE FROM whatcha.`posts-comments` WHERE `commentId`= ?',
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
                        message: 'Comment Successfully Deleted!',
                    });
                }
            }
        );
    });
};
