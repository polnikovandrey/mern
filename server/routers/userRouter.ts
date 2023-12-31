import express, {Router} from "express";
import {User} from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt, {Secret} from "jsonwebtoken";

const router: Router = express.Router();

router.post("/", async (request, response) => {
	try {
		const {email, password, passwordVerify} = request.body;

		if (!email || !password || !passwordVerify) {
			return response.status(400)
						   .json({
							   errorMessage: 'Please enter all required fields'
						   });
		}

		if (password.length < 6) {
			return response.status(400)
						   .json({
							   errorMessage: 'Please enter a password of at least 6 characters'
						   });
		}

		if (password !== passwordVerify) {
			return response.status(400)
						   .json({
							   errorMessage: 'Please enter the same password twice for verification'
						   });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return response.status(400)
						   .json({
							   errorMessage: 'An account with that email already exists'
						   });
		}

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			passwordHash
		});
		const savedUser = await newUser.save();

		// See http://jwt.io
		// See http://passwordgenerator.net
		const token = jwt.sign({
			id: savedUser._id
		}, process.env.JWT_SECRET as Secret);

		response.cookie('token', token, { httpOnly: true })
				.send();

	} catch(error) {
		response.status(500).send();
	}
});

router.post('/login', async (request, response) => {
	try {
		const {email, password} = request.body;

		if (!email || !password) {
			return response.status(400)
						   .json({
							   errorMessage: 'Please enter all required fields'
						   });
		}

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return response.status(401)
						   .json({
							   errorMessage: 'Wrong email or password'
						   });
		}

		const correctPassword: boolean = await bcrypt.compare(password, existingUser.passwordHash);
		if(!correctPassword) {
			return response.status(401)
						   .json({
							   errorMessage: 'Wrong email or password'
						   });
		}

		// See http://jwt.io
		// See http://passwordgenerator.net
		const token = jwt.sign({
			id: existingUser._id
		}, process.env.JWT_SECRET as Secret);

		response.cookie('token', token, { httpOnly: true })
				.send();

	} catch(error) {
		response.status(500).send();
	}
});

router.get("/loggedIn", (request, response) => {
	try {
		const token = request.cookies.token;
		if (!token) {
			return response.json(null);
		}
		const validatedUser: { id: string } = jwt.verify(token, process.env.JWT_SECRET as Secret) as { id: string };
		response.json(validatedUser.id);
	} catch (error) {
		return response.json(null);
	}
});

router.get("/logout", (request, response) => {
	try {
		response.clearCookie('token').send();
	} catch (error) {
		return response.json(null);
	}
});

module.exports = router;