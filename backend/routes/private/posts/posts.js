module.exports = function (app, connection) {
    // get all posts
    app.route('/api/pub/posts').get(function (req, res, next) {
        connection.query(
            'SELECT "posts-list".pid, "posts-list".content, "posts-list"."imgUrl", "posts-list".upvotes, "posts-list".comments, "posts-list"."createdAt", "users".fullname, users.username, users.image FROM "posts-list" INNER JOIN users ON "posts-list".uid = users.id ORDER BY "createdAt" DESC',
            (error, result) => {
                if (error) {
                    res.sendStatus(500);
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

    // get trending posts
    app.route('/api/pub/posts/trending').get(function (req, res, next) {
        connection.query(
            'SELECT "posts-list".pid, "posts-list".content, "posts-list"."imgUrl", "posts-list".upvotes, "posts-list".comments, "posts-list"."createdAt", "users".fullname, users.username, users.image FROM "posts-list" INNER JOIN users ON "posts-list".uid = users.id WHERE "posts-list".upvotes >= 10 ORDER BY upvotes DESC',
            (error, result) => {
                if (error) {
                    res.sendStatus(500);
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

    // get saved posts of a user
    app.route('/api/pub/posts/saved/:uid').get(function (req, res, next) {
        const uid = req.params.uid;
        connection.query(
            'SELECT "saved-posts".pid from "saved-posts" WHERE uid = $1',
            [uid],
            (error, result) => {
                if (error) {
                    res.json(error);
                } else {
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.header('Access-Control-Allow-Origin', '*');
                    res.json({
                        error: false,
                        data: result.rows,
                    });
                }
            }
        );
    });
};
