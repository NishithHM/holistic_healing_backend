const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

var user = new User();
async function unpack(jwtToken) {
    try {
        const res = await jwt.verify(jwtToken, 'key987');
        user = await User.findOne({ phoneNumber: res.phoneNumber })
        return res;
    } catch (error) {
        return null;
    }
}

exports.authAdmin = async function (req, res, next) {
    const jwtToken = req.headers.authorization;
    token = await unpack(jwtToken)
    if (token == null || jwtToken == null) {
        res.status(401).send('Invalid Token')
    } else {
        req.user = user
        if (token.role.toLowerCase() == "admin") {
            next()
        } else {
            res.status(401).send('Unauthorized Access')
        }
    }
}
exports.authUser = async function (req, res, next) {
    const jwtToken = req.headers.authorization;

    const token = await unpack(jwtToken)
    if (token == null || jwtToken == null) {
        res.status(401).send('Invalid Token')
    } else {
        req.user = user
        console.log(user)
        if (token.role.toLowerCase() == "user" || token.role.toLowerCase() == "admin") {
            next()
        } else {
            res.status(401).send('Unauthorized Access')
        }
    }
}
exports.authSuperAdmin = async function (req, res, next) {
    const jwtToken = req.headers.authorization;
    token = await unpack(jwtToken)
    if (token == null || jwtToken == null) {
        res.status(401).send('Invalid Token')
    } else {
        req.user = user
        if (token.role.toLowerCase() == "superadmin") {
            next()
        } else {
            res.status(401).send('Unauthorized Access')
        }
    }
}
