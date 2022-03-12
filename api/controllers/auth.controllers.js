const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

var user = new User();
class Authentication{
	 static ensureRole(roles){
		return async function (req, res, next) {
			try {
			const jwtToken = req.headers.authorization;
			const {phoneNumber, role}= await jwt.verify(jwtToken, 'key987');
			if (phoneNumber == null || jwtToken == null) {
				res.status(401).send('Invalid Token')
			} else {
				if (roles.includes(role)) {
					user = await User.findOne({ phoneNumber: phoneNumber })
					req.user = user;
					next()
				} else {
					res.status(401).send('Unauthorized Access')
				}
			}
		} catch (error) {
			console.log(error)
			res.status(401).send('Unauthorized Access')
		}
	}
		
	}

}

module.exports = Authentication;
