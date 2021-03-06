require('dotenv').config();

const express = require('express');
const cors = require('cors');
const https = require('https');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const connection = require('./connections/user');
const auth = require('./helpers/auth');

const app = express();

var checkUserFilter = function (req, res, nex) {
    const regex = '/api/pvt/';
    if (req._parsedUrl.pathname.match(regex)) {
        auth.authenticateToken(req, res, nex);
    } else {
        nex();
    }
};

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(checkUserFilter);

// app.use((req, res, next) => {
// 	res.append('Access-Control-Allow-Origin', ['*']);
// 	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// 	res.append('Access-Control-Allow-Headers', 'Content-Type');
// 	next();
// });

require('./routes/auth/google')(app, connection, axios);
require('./routes/private/posts/posts')(app, connection);
require('./routes/private/post/post')(app, connection);
require('./routes/private/blogs/blogs')(app, connection);
require('./routes/private/users/users')(app, connection);
require('./routes/private/chat/chat')(app, connection);
require('./routes/private/chat/messages')(app, connection);
require('./routes/private/users/connections')(app, connection);
require('./routes/private/posts/comments/comments')(app, connection);
require('./routes/private/posts/comments/likes')(app, connection);

/*  PRODUCTION  */
// var key = fs.readFileSync(__dirname + '/ssl/server.key');
// var cert = fs.readFileSync(__dirname + '/ssl/server.crt');
// var ca = fs.readFileSync (__dirname + '/ssl/ca_bundle.crt');
// var options = {
// 	key: key,
// 	cert: cert,
// 	ca: ca
// };
// var server = https.createServer(options, app);
// server.listen(443, () => {
// 	console.log("server starting on port : " + 443)
// });

/*  DEVELOPMENT */
app.set('port', process.env.PORT || 8080);
const server = app.listen(8080, () =>
    console.log('server is running on port 8080')
);

require('./sockets')(server, connection);
