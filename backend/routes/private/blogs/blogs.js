module.exports = function (app, connection) {
    // get all blogs
    app.route('/api/pub/blogs').get(function (req, res, next) {
        connection.query(
            'SELECT "blogs-list"."blogId", "blogs-list".content, "blogs-list".title, "blogs-list"."createdAt", "blogs-list".uid, users.fullname, users.username, users.image  FROM "blogs-list" INNER JOIN users ON "blogs-list".uid = users.id',
            (error, result) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header(
                    'Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept'
                );
                if (error) res.json(error);
                else {
                    res.json({
                        error: false,
                        data: result.rows,
                    });
                }
            }
        );
    });

    // create a new blog
    app.route('/api/pub/blogs').post(function (req, res, nex) {
        const uid = req.body.uid;
        const title = req.body.title;
        const content = req.body.content;
        const dateCreated = new Date();
        connection.query(
            'INSERT INTO "blogs-list" (uid, title, content, "createdAt") values($1, $2, $3, $4)',
            [uid, title, content, dateCreated],
            function (error, result) {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.json({ error: false, message: 'Blog Created!' });
                }
            }
        );
    });

    // get a particular blog
    app.route('/api/pub/blogs/:blogId').get(function (req, res, next) {
        const blogId = req.params.blogId;
        connection.query(
            'SELECT * FROM "blogs-list" WHERE "blogId" = $1',
            [blogId],
            function (error, result) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header(
                    'Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept'
                );
                if (error) res.json(error);
                else {
                    res.json({
                        error: false,
                        data: result.rows,
                    });
                }
            }
        );
    });

    // update a particular blog
    app.route('/api/pub/blogs/:blogId').put(function (req, res, nex) {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "blogs-list" SET ';
            let queryArray = [];

            const updateColumns = (colArray) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['title', 'content', 'upvotesCount']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE "blogId" = ${req.params.blogId}`;

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();

        connection.query(
            args.queryString,
            args.queryArray,
            function (error, result) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header(
                    'Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept'
                );
                if (error) res.json(error);
                else {
                    res.json({ error: false, message: 'Blog Updated!' });
                }
            }
        );
    });

    // delete a particular blog
    app.route('/api/pub/blogs/:blogId').delete(function (req, res, next) {
        const blogId = req.params.blogId;
        connection.query(
            'DELETE FROM "blogs-list" WHERE "blogId" = $1',
            [blogId],
            function (error, result) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header(
                    'Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept'
                );
                if (error) res.json(error);
                else {
                    res.json({ error: false, message: 'Blog Deleted!' });
                }
            }
        );
    });
};
