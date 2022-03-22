const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	//console.log(req.body)
	var { name, phoneNumber, email, role, password } = req.body;

	if (password == undefined || role == undefined) {
		password = phoneNumber.toString();
		role = "user";
	}
	const hash_password = bcrypt.hashSync(password, 10)
	const isActive = true;
	const user = new User({ name, phoneNumber, email, role, isActive, hash_password });

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
exports.getUserByPhone = async (req, res) => {
    const phoneNumber = req.params.phoneNumber;
	try {
		const user = await User.findOne({
			phoneNumber
		})
		if (user) {
			res.status(201).json(user)
		} else {
			res.status(204).send('Not Yet Registered')
		}
	} catch (error) {
		res.status(401).send(error)
	}
}


