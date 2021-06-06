import express, {response, Router} from "express";
import {User} from "../models/userModel";
import bcrypt from "bcryptjs";

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

		response.send(savedUser);

	} catch(error) {
		response.status(500).send();
	}
});

module.exports = router;