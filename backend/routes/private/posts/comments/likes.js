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
            'INSERT INTO "comments-likes" ("commentId", uid, "createdAt") values ($1, $2, $3)',
            [commentId, uid, createdAt],
            function (error, result) {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
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
            'SELECT "comments-likes".*, users.fullname, users.image, "users-info".bio FROM "comments-likes" INNER JOIN users ON TRUE INNER JOIN "users-info" ON "comments-likes".uid = users.id AND "users-info".uid = users.id WHERE "commentId" = $1',
            [commentId],
            function (error, result) {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.json({
                        error: false,
                        data: result.rows,
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
            'SELECT * FROM "comments-likes" WHERE "commentId" = $1 AND uid = $2',
            [commentId, uid],
            function (error, result) {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.json({
                        error: false,
                        data: result.rows,
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
            'DELETE FROM "comments-likes" WHERE "commentId" = $1 AND uid = $2',
            [commentId, uid],
            function (error, result) {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.json({
                        error: false,
                        message: 'Like Successfully Deleted!',
                    });
                }
            }
        );
    });
};
