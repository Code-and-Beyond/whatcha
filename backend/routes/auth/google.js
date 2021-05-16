const auth = require('../../helpers/auth');
const { v4: uuidv4 } = require('uuid');

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
                    'SELECT * FROM users WHERE username = $1',
                    [response.data.email],
                    function (error, result) {
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
                            if (result.rows.length < 1) {
                                const uid = uuidv4();
                                userConnection.query(
                                    'INSERT INTO "users-info" (uid) VALUES($1)',
                                    [uid],
                                    function (error, result) {
                                        if (error) {
                                            console.log(error);
                                        }
                                    }
                                );
                                userConnection.query(
                                    'INSERT INTO users (id, username, fname, lname, fullname, image) VALUES ($1, $2, $3, $4, $5, $6)',
                                    [
                                        uid,
                                        googleData.email,
                                        googleData.given_name,
                                        googleData.family_name,
                                        googleData.name,
                                        googleData.picture,
                                    ],
                                    function (error, result) {
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
                                                'SELECT * FROM users WHERE username = $1',
                                                [username],
                                                function (error, result) {
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
                                                            data:
                                                                result.rows[0],
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
                                    'UPDATE users SET logins = logins + 1, lastlog = CURRENT_TIMESTAMP WHERE username = $1',
                                    [googleData.email],
                                    function (error, result) {
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
                                                'SELECT * FROM users WHERE username = $1',
                                                [username],
                                                function (error, result) {
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
                                                            data:
                                                                result.rows[0],
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
