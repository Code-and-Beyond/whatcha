require("dotenv").config();

const express = require("express");
const cors = require("cors");
const https = require("https");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const axios = require("axios");
const connection = require("./connections/user");
const auth = require("./helpers/auth");

const http = require("http");
const app = express();
const server = http.createServer(app);

server.listen(5000, () => console.log("server is running on port 5000"));

var checkUserFilter = function (req, res, nex) {
    const regex = "/api/pvt/";
    if (req._parsedUrl.pathname.match(regex)) {
        auth.authenticateToken(req, res, nex);
    } else {
        nex();
    }
};

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(checkUserFilter);

require("./routes/auth/google")(app, connection, axios);

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
// app.set('port', process.env.PORT || 8080);
// app.listen(8080);
