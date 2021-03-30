const auth = require('../../helpers/auth');

module.exports = function (app, userConnection, axios) {
    app.route('/auth/google').post(function (req, res, nex) {
        var username = req.body.username;
        var token = req.body.token;
        var url =
            'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' +
            token;
        axios.get(url).then((response) => {
            if (
                response.data.email !== username ||
                !response.data.verified_email
            )
                return res.sendStatus(401);
            else {
                const googleData = response.data;
                userConnection.query(
                    'SELECT * FROM weconf.users WHERE `username` = ? ',
                    [response.data.email],
                    function (error, results, fields) {
                        if (error) {
                            console.log({ error });
                            res.header('Access-Control-Allow-Origin', '*');
                            res.header(
                                'Access-Control-Allow-Headers',
                                'Origin, X-Requested-With, Content-Type, Accept'
                            );
                            res.json({
                                error: true,
                                message: 'Something went wrong',
                            });
                        } else {
                            if (results.length < 1) {
                                userConnection.query(
                                    'INSERT INTO weconf.users (`id`, `username`, `fname`, `lname`, `fullname`, `image`) VALUES ( UUID(), ?, ?, ?, ?, ?)',
                                    [
                                        googleData.email,
                                        googleData.given_name,
                                        googleData.family_name,
                                        googleData.name,
                                        googleData.picture,
                                    ],
                                    function (error, results, fields) {
                                        if (error) {
                                            console.log({ error });
                                            res.header(
                                                'Access-Control-Allow-Origin',
                                                '*'
                                            );
                                            res.header(
                                                'Access-Control-Allow-Headers',
                                                'Origin, X-Requested-With, Content-Type, Accept'
                                            );
                                            res.json({
                                                error: true,
                                                message: 'Something went wrong',
                                            });
                                        } else {
                                            userConnection.query(
                                                'SELECT * FROM weconf.users WHERE `username` = ?',
                                                [username],
                                                function (
                                                    error,
                                                    results,
                                                    fields
                                                ) {
                                                    if (error) {
                                                        console.log({ error });
                                                        res.header(
                                                            'Access-Control-Allow-Origin',
                                                            '*'
                                                        );
                                                        res.header(
                                                            'Access-Control-Allow-Headers',
                                                            'Origin, X-Requested-With, Content-Type, Accept'
                                                        );
                                                        res.json({
                                                            error: true,
                                                            message:
                                                                'Something went wrong',
                                                        });
                                                    } else {
                                                        const accessToken = auth.generateAccessToken(
                                                            {
                                                                name:
                                                                    googleData.email,
                                                            }
                                                        );
                                                        const refreshToken = auth.generateRefreshToken(
                                                            {
                                                                name:
                                                                    googleData.email,
                                                            }
                                                        );
                                                        res.header(
                                                            'Access-Control-Allow-Origin',
                                                            '*'
                                                        );
                                                        res.header(
                                                            'Access-Control-Allow-Headers',
                                                            'Origin, X-Requested-With, Content-Type, Accept'
                                                        );
                                                        res.json({
                                                            error: false,
                                                            message:
                                                                'User Logged In',
                                                            data: results[0],
                                                            tokens: {
                                                                accessToken: accessToken,
                                                                refreshToken: refreshToken,
                                                            },
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            } else {
                                userConnection.query(
                                    'UPDATE weconf.users SET `logins` = `logins`+1, `lastlog` = CURRENT_TIMESTAMP WHERE `username` = ?',
                                    [googleData.email],
                                    function (error, results, fields) {
                                        if (error) {
                                            console.log({ error });
                                            res.header(
                                                'Access-Control-Allow-Origin',
                                                '*'
                                            );
                                            res.header(
                                                'Access-Control-Allow-Headers',
                                                'Origin, X-Requested-With, Content-Type, Accept'
                                            );
                                            res.json({
                                                error: true,
                                                message: 'Something went wrong',
                                            });
                                        } else {
                                            userConnection.query(
                                                'SELECT * FROM weconf.users WHERE `username` = ?',
                                                [username],
                                                function (
                                                    error,
                                                    results,
                                                    fields
                                                ) {
                                                    if (error) {
                                                        console.log({ error });
                                                        res.header(
                                                            'Access-Control-Allow-Origin',
                                                            '*'
                                                        );
                                                        res.header(
                                                            'Access-Control-Allow-Headers',
                                                            'Origin, X-Requested-With, Content-Type, Accept'
                                                        );
                                                        res.json({
                                                            error: true,
                                                            message:
                                                                'Something went wrong',
                                                        });
                                                    } else {
                                                        const accessToken = auth.generateAccessToken(
                                                            {
                                                                name:
                                                                    googleData.email,
                                                            }
                                                        );
                                                        const refreshToken = auth.generateRefreshToken(
                                                            {
                                                                name:
                                                                    googleData.email,
                                                            }
                                                        );
                                                        res.header(
                                                            'Access-Control-Allow-Origin',
                                                            '*'
                                                        );
                                                        res.header(
                                                            'Access-Control-Allow-Headers',
                                                            'Origin, X-Requested-With, Content-Type, Accept'
                                                        );
                                                        res.json({
                                                            error: false,
                                                            message:
                                                                'User Logged In',
                                                            data: results[0],
                                                            tokens: {
                                                                accessToken: accessToken,
                                                                refreshToken: refreshToken,
                                                            },
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            }
        });
    });
};