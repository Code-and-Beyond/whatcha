module.exports = function (app, connection) {

    //to insert a post by a user
    app.route("/api/pub/post")
        .post(function (req, res, nex) {
            const name = req.body.name;
            connection.query("INSERT INTO whatcha.`posts-list` (`name`) values(?)", [name],
                function (error, result, fields) {
                    if (error) res.json(error);
                    else {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                        res.json({ error: false, message: "Category Created" });
                    }
                });
        });


        //to get all the posts by a user
    app.route('/api/pub/post/:name')
        .get(function (req, res, next) {
            connection.query("SELECT * FROM whatcha.`posts-list` WHERE `name` LIKE ? ",["%" + query + "%"],
                function (error, result, fields) {
                    if (error) { res.sendStatus(500) }
                    else {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                        res.json({
                            error: false,
                            data: result
                        });
                    }
                }
            );
        });


    
    }