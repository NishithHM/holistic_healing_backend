const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	console.log(req.body)
	const user = new User(req.body)
	if (req?.body?.password) {
		user.hash_password = bcrypt.hashSync(req.body.password, 10)
		user.isActive = true
	} else {
		res.status(400).send("Password required")
	}
	try {
		await user.save()
		res.status(201).json({
			token: jwt.sign({ phoneNumber: user.phoneNumber, role: user.role }, 'key987', {
				expiresIn: '30d'
			}), user
		})
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
};

exports.signIn = (req, res) => {
	try {
		User.findOne({
			phoneNumber: req.body.phoneNumber
		}, function (err, user) {
			if (err) {
				console.log(err);
				res.status(401).send("User Not Found");
			}
			if (!user || !user.comparePassword(req.body.password.toString())) {
				res.status(401).send('Unauthorized Access')
			} else {
				res.status(201).send({
					token: jwt.sign({ phoneNumber: user.phoneNumber, role: user.role }, 'key987', {
						expiresIn: '30d'
					}), user
				})
			}
		})
	} catch (error) {
		res.status(500).send(error)
	}
}

exports.getUser = async (req, res) => {
	try {
		const user = await User.findOne({
			phoneNumber: req.user.phoneNumber
		})
		if (user) {
			res.status(201).json(user)
		} else {
			res.status(401).send('Unauthorized Access1')
		}
	} catch (error) {
		res.status(401).send(error)
	}

}


