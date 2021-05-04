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
            'INSERT INTO whatcha.`comments-likes` (`commentId`, `uid`, `createdAt`) values (?, ?, ?)',
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
            'SELECT whatcha.`comments-likes`.* , whatcha.`users`.fullname, whatcha.`users`.image, whatcha.`users-info`.bio FROM whatcha.`comments-likes` INNER JOIN whatcha.`users` INNER JOIN whatcha.`users-info` ON whatcha.`comments-likes`.uid = whatcha.`users`.id AND whatcha.`users-info`.uid = whatcha.`users`.id WHERE `commentId` = ?',
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
            'SELECT * FROM whatcha.`comments-likes` WHERE `commentId` = ? AND `uid` = ?',
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
            'DELETE FROM whatcha.`comments-likes` WHERE `commentId`= ? AND `uid` = ?',
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
