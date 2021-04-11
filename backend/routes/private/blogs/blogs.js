module.exports = function (app, connection) {
    app.route('/api/pub/blogs')
        // get all blogs
        .get(function (req, res, next) {
            connection.query('SELECT * FROM whatcha.`blogs-list`', (error, result, fields) => {
                res.header('Access-Control-Allow-Origin', '*')
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
                if (error) res.json(error);
                else {
                    res.json({
                        error: false,
                        data: result
                    })
                }
            })
        })
        // create a new blog 
        .post(function (req, res, nex) {
            const uid = req.body.uid;
            const title = req.body.title;
            const content = req.body.content;
            connection.query("INSERT INTO whatcha.`blogs-list` (`uid`, `title`, `content`) values(?,?, ?)", [uid, title, content],
                function (error, result, fields) {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                    if (error) res.json(error);
                    else {
                        res.json({ error: false, message: "Blog Created!" });
                    }
                });
        });

    app.route('/api/pub/blogs/:blogId')
        // get a particular blog
        .get(function (req, res, next) {
            const blogId = req.params.blogId;
            connection.query(`SELECT * FROM whatcha.\`blogs-list\` WHERE \`blogId\` = ${blogId}`,
                function (error, result, fields) {
                    res.header('Access-Control-Allow-Origin', '*')
                    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
                    if (error) res.json(error);
                    else {
                        res.json({
                            error: false,
                            data: result
                        })
                    }
                }
            );
        })
        // update a particular blog
        .put(function (req, res, nex) {
            const computeUpdateQuery = () => {
                let queryString = "UPDATE whatcha.`blogs-list` SET ";
                let queryArray = [];

                const updateColumns = (colArray) => {
                    for (let colName of colArray) {
                        if (req.body[colName] === undefined)
                            return;

                        queryString += `\`${colName}\` = ?, `;
                        queryArray.push(req.body[colName]);
                    }
                }

                updateColumns(["title", "content", "upvotesCount"]);

                queryString = queryString.substring(0, queryString.length - 2);
                queryString += ` WHERE \`blogId\` = ${req.params.blogId}`;

                return { queryString, queryArray };
            }

            const args = computeUpdateQuery();

            connection.query(args.queryString, args.queryArray,
                function (error, result, fields) {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                    if (error) res.json(error);
                    else {
                        res.json({ error: false, message: "Blog Updated!" });
                    }
                });
        })
        // delete a particular blog
        .delete(function (req, res, next) {
            const blogId = req.params.blogId;
            connection.query(`DELETE FROM whatcha.\`blogs-list\` WHERE \`blog_id\` = ${blogId}`,
                function (error, result, fields) {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                    if (error) res.json(error);
                    else {
                        res.json({
                            error: false,
                            data: result
                        });
                    }
                }
            );
        });
}