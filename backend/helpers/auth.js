require('dotenv').config();

const jwt = require('jsonwebtoken');

var acsTkn = "";
var refreshTokens = [];

module.exports = {
	acsTkn,
	refreshTokens,
	authenticateToken: function (req, res, next) {
		try {
			var token = req.headers.authorization.split(' ')[1];
			if (token == null) return res.sendStatus(401);
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
				if (err) { return res.sendStatus(403); }
				req.body.username = user;
				next();
			});
		} catch (error) {
			res.sendStatus(401);
		}

	},

	generateAccessToken: function (user) {
		const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });
		return accesToken;
	},

	generateRefreshToken: function (user) {
		const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '14d' });
		this.refreshTokens.push(refreshToken);
		return refreshToken;
	},

	verifyRefreshToken: function (refreshToken) {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, ((err, user) => {
			if (err) return "no";
			const accessToken = this.generateAccessToken({ name: user.name });
			this.acsTkn = accessToken;
			return accessToken.toString();
		}
		));
	}
};
