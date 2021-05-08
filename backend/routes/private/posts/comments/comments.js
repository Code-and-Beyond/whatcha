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
            'INSERT INTO ' + process.env.DB_USER_DATABASE + '.`posts-comments` (`commentId`, `pid`, `uid`, `text`, `createdAt`) values (UUID(), ?, ?, ?, ?)',
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
            'SELECT ' + process.env.DB_USER_DATABASE + '.`posts-comments`.*, ' + process.env.DB_USER_DATABASE + '.`users`.fullname, ' + process.env.DB_USER_DATABASE + '.`users`.image, ' + process.env.DB_USER_DATABASE + '.`users-info`.bio FROM ' + process.env.DB_USER_DATABASE + '.`posts-comments` INNER JOIN ' + process.env.DB_USER_DATABASE + '.`users` INNER JOIN ' + process.env.DB_USER_DATABASE + '.`users-info` ON ' + process.env.DB_USER_DATABASE + '.`posts-comments`.uid = ' + process.env.DB_USER_DATABASE + '.`users`.id AND ' + process.env.DB_USER_DATABASE + '.`users-info`.uid = ' + process.env.DB_USER_DATABASE + '.`users`.id WHERE `pid` = ? ORDER BY createdAt DESC',
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
            let queryString = 'UPDATE ' + process.env.DB_USER_DATABASE + '.`posts-comments` SET ';
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
            'DELETE FROM ' + process.env.DB_USER_DATABASE + '.`posts-comments` WHERE `commentId`= ?',
            [commentId],
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
