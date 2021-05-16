module.exports = function (app, connection) {
    // get all connections of a particular user
    app.route(`/api/pub/connection/:uid`).get(function (req, res, next) {
        const { uid } = req.params;
        connection.query(
            'SELECT "users-info".*, users.id, users.fullname, users.image, users.username FROM "user-connections" INNER JOIN "users-info" ON TRUE INNER JOIN users ON ("user-connections".uid1 = $1 OR "user-connections".uid2 = $1) AND users.id != $1 AND ("user-connections".uid1 = "users-info".uid OR "user-connections".uid2 = "users-info".uid) AND users.id = "users-info".uid;',
            [uid],
            (error, result) => {
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
                        data: result.rows,
                    });
                }
            }
        );
    });

    // add a connection for a user
    app.route('/api/pub/connection/:uid1/:uid2').post(function (
        req,
        res,
        next
    ) {
        let { uid1, uid2 } = req.params;
        if (uid1 > uid2) [uid1, uid2] = [uid2, uid1];
        connection.query(
            'INSERT INTO "user-connections" (uid1, uid2) values($1, $2)',
            [uid1, uid2],
            (error, result) => {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.json({ error: false, message: 'Connection Added!' });
                }
            }
        );
    });

    // delete a connection for a user
    app.route('/api/pub/connection/:uid1/:uid2').delete(function (
        req,
        res,
        next
    ) {
        let { uid1, uid2 } = req.params;
        if (uid1 > uid2) [uid1, uid2] = [uid2, uid1];
        connection.query(
            'DELETE FROM "user-connections" WHERE uid1 = $1 AND uid2 = $2',
            [uid1, uid2],
            (error, result) => {
                if (error) {
                    res.json(error);
                } else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Headers',
                        'Origin, X-Requested-With, Content-Type, Accept'
                    );
                    res.json({ error: false, message: 'Connection Deleted!' });
                }
            }
        );
    });
};
