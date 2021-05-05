module.exports = function (app, connection) {
    // get all connections of a particular user
    app.route(`/api/pub/connection/:uid`).get(function (req, res, next) {
        const { uid } = req.params;
        connection.query(
            'SELECT whatcha.`users-info`.*, whatcha.`users`.id, whatcha.`users`.fullname, whatcha.`users`.image, whatcha.`users`.username FROM whatcha.`user-connections` INNER JOIN whatcha.`users-info` INNER JOIN whatcha.`users` ON (whatcha.`user-connections`.uid1 = ? OR whatcha.`user-connections`.uid2 = ?) AND whatcha.`users`.id != ? AND (whatcha.`user-connections`.uid1 = whatcha.`users-info`.uid OR whatcha.`user-connections`.uid2 = whatcha.`users-info`.uid) AND whatcha.`users`.id = whatcha.`users-info`.uid;',
            [uid, uid, uid],
            (error, result, fields) => {
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

    // add a connection for a user
    app.route('/api/pub/connection/:uid1/:uid2').post(function (
        req,
        res,
        next
    ) {
        const { uid1, uid2 } = req.params;
        if (uid1 > uid2) [uid1, uid2] = [uid2, uid1];
        connection.query(
            'INSERT INTO whatcha.`user-connections` (`uid1`,`uid2`) values(?,?)',
            [uid1, uid2],
            (error, result, fields) => {
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
        const { uid1, uid2 } = req.params;
        if (uid1 > uid2) [uid1, uid2] = [uid2, uid1];
        connection.query(
            'DELETE FROM whatcha.`user-connections` WHERE `uid1`= ? AND `uid2` = ? ',
            [uid1, uid2],
            (error, result, fields) => {
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
