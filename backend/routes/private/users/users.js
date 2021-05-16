module.exports = function (app, connection) {
    // get all blogs of a particular user
    app.route('/api/pub/users/:uid/blogs').get(function (req, res, next) {
        const uid = req.params.uid;
        connection.query(
            'SELECT * FROM "blogs-list" WHERE uid = $1',
            [uid],
            (error, result) => {
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

    // get all posts id for a particular user-id
    app.route('/api/pub/users/upvote/:uid').get(function (req, res, next) {
        const uid = req.params.uid;
        connection.query(
            'SELECT pid FROM "user-upvotes" WHERE uid = $1',
            [uid],
            (error, result) => {
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

    // increase upvote of a post
    app.route('/api/pub/users/upvote/:uid/:pid').post(function (
        req,
        res,
        next
    ) {
        const uid = req.params.uid;
        const pid = req.params.pid;
        const dateUpvoted = new Date();
        connection.query(
            'INSERT INTO "user-upvotes" (uid, pid, "createdAt") values($1 ,$2, $3)',
            [uid, pid, dateUpvoted],
            (error, result) => {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.json({ error: false, message: 'Upvote Added!' });
                }
            }
        );
    });

    // decrease upvote of an post
    app.route('/api/pub/users/upvote/:uid/:pid').delete(function (
        req,
        res,
        next
    ) {
        const uid = req.params.uid;
        const pid = req.params.pid;
        connection.query(
            'DELETE FROM "user-upvotes" WHERE uid = $1 AND pid = $2',
            [uid, pid],
            (error, result) => {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.json({ error: false, message: 'Upvote Deleted!' });
                }
            }
        );
    });

    // get user info
    app.route('/api/pub/users/profile/:uid').get(function (req, res, next) {
        const uid = req.params.uid;
        connection.query(
            'SELECT * FROM "users-info" WHERE uid = $1',
            [uid],
            (error, result) => {
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

    // get all users with info
    app.route('/api/pub/allUsers').get(function (req, res, next) {
        connection.query(
            'SELECT users.* , "users-info".bio FROM users INNER JOIN "users-info" ON "users-info".uid = users.id',
            (error, result) => {
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

    // update user info
    app.route('/api/pub/users/profile/:uid').put(function (req, res, next) {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "users-info" SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['bio', 'location', 'organization', 'website']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE uid = $${queryArray.length + 1}`;
            queryArray.push(req.params.uid);

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();

        connection.query(
            args.queryString,
            args.queryArray,
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
                        message: 'Profile Successfully Updated!',
                    });
                }
            }
        );
    });
};
