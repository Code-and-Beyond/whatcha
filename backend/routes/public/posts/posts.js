module.exports = function (app, connection) {

    app.route('/api/pub/posts')
        .get(function (req, res, next) {
            connection.query("SELECT * FROM whatcha.`posts-list`", [],
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