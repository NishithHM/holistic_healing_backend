const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res)=>{
	console.log(req.body.phoneNumber.toString().length)
	const user = new User(req.body)
	if(req?.body?.password){
	user.hash_password = bcrypt.hashSync(req.body.password, 10)
	user.isActive = true
	}else{
		res.status(400).send("Password required")
	}
	try {
		await user.save()
		res.json(user)
	} catch (error) {
		res.status(400).send(error)
	}
};

exports.signIn = (req,res)=>{
	console.log(req.body.phoneNumber)
	User.findOne({
		phoneNumber:req.body.phoneNumber
	},function(err,user){
		if(err) {
			console.log(err);
			res.status(401).send("User Not Found");
		}
		console.log(user)
		if(!user || !user.comparePassword(req.body.password)){
			res.status(401).send('Unauthorized Access')
		}else{
		res.status(201).send({token: jwt.sign({phoneNumber:user.phoneNumber, role: user.role},'key987', {
			expiresIn:'30d'
		}), user})
	}
	})
}

exports.checkAuth= (req, res, next)=>{
	const jwtToken = req.headers.authorization
	if(jwtToken){
		jwt.verify(jwtToken, 'key987', (err, user)=>{
			if(err){
				console.log(err)
				res.status(401).send('Unauthorized Access')
			}else if(user){
				console.log(user.phoneNumber)
				req.phoneNumber = user.phoneNumber
				req.role = user.role
				next()
			}
		})
	}else{
		res.status(401).send('Unauthorized Access')
	}
}

exports.getUser=async (req, res)=>{
	try {
		const user =await User.findOne({
			phoneNumber: req.phoneNumber
		})
		if(user){
		res.json(user)
		}else{
			res.status(401).send('Unauthorized Access')
		}
	} catch (error) {
		res.status(401).send(error)
	}
	
}


