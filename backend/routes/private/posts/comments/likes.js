module.exports = function (app, connection) {
    // add a like to a comment
    app.route('/api/pub/posts/comments/:commentId/likes').post(function (
        req,
        res,
        next
    ) {
        const { commentId } = req.params;
        const { uid } = req.body;
        const createdAt = new Date();
        connection.query(
            'INSERT INTO ' + process.env.DB_USER_DATABASE + '.`comments-likes` (`commentId`, `uid`, `createdAt`) values (?, ?, ?)',
            [commentId, uid, createdAt],
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
                        message: 'Like Successfully Created!',
                    });
                }
            }
        );
    });

    // get likes of a comment
    app.route('/api/pub/posts/comments/:commentId/likes').get(function (
        req,
        res,
        next
    ) {
        const { commentId } = req.params;
        connection.query(
            'SELECT ' + process.env.DB_USER_DATABASE + '.`comments-likes`.* , ' + process.env.DB_USER_DATABASE + '.`users`.fullname, ' + process.env.DB_USER_DATABASE + '.`users`.image, ' + process.env.DB_USER_DATABASE + '.`users-info`.bio FROM ' + process.env.DB_USER_DATABASE + '.`comments-likes` INNER JOIN ' + process.env.DB_USER_DATABASE + '.`users` INNER JOIN ' + process.env.DB_USER_DATABASE + '.`users-info` ON ' + process.env.DB_USER_DATABASE + '.`comments-likes`.uid = ' + process.env.DB_USER_DATABASE + '.`users`.id AND ' + process.env.DB_USER_DATABASE + '.`users-info`.uid = ' + process.env.DB_USER_DATABASE + '.`users`.id WHERE `commentId` = ?',
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
                        data: result,
                    });
                }
            }
        );
    });

    // get a like
    app.route('/api/pub/posts/comments/:commentId/likes/:uid').get(function (
        req,
        res,
        next
    ) {
        const { commentId, uid } = req.params;
        connection.query(
            'SELECT * FROM ' + process.env.DB_USER_DATABASE + '.`comments-likes` WHERE `commentId` = ? AND `uid` = ?',
            [commentId, uid],
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

    // remove a like from a comment
    app.route('/api/pub/posts/comments/:commentId/likes/:uid').delete(function (
        req,
        res,
        next
    ) {
        const { commentId, uid } = req.params;
        connection.query(
            'DELETE FROM ' + process.env.DB_USER_DATABASE + '.`comments-likes` WHERE `commentId`= ? AND `uid` = ?',
            [commentId, uid],
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
                        message: 'Like Successfully Deleted!',
                    });
                }
            }
        );
    });
};
