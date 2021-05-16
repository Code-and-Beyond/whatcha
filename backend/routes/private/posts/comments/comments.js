const { v4: uuidv4 } = require('uuid');

module.exports = function (app, connection) {
    // create comment
    app.route('/api/pub/posts/:postId/comments').post(function (
        req,
        res,
        next
    ) {
        const { postId } = req.params;
        const { uid, text } = req.body;
        const commentId = uuidv4();
        const createdAt = new Date();
        connection.query(
            'INSERT INTO "posts-comments" ("commentId", pid, uid, text, "createdAt") values ($1, $2, $3, $4, $5)',
            [commentId, postId, uid, text, createdAt],
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
            'SELECT "posts-comments".*, users.fullname, users.image, "users-info".bio FROM "posts-comments" INNER JOIN users ON TRUE INNER JOIN "users-info" ON "posts-comments".uid = users.id AND "users-info".uid = users.id WHERE pid = $1 ORDER BY "createdAt" DESC',
            [postId],
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

    // update comment
    app.route('/api/pub/posts/comments/:commentId').put(function (
        req,
        res,
        next
    ) {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "posts-comments" SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['text', 'likesCount']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE "commentId" = $${queryArray.length + 1}`;
            queryArray.push(req.params.commentId);

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
            'DELETE FROM "posts-comments" WHERE "commentId" = $1',
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
                        message: 'Comment Successfully Deleted!',
                    });
                }
            }
        );
    });
};
