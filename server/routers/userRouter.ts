import express, {response, Router} from "express";

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

	} catch(error) {
		response.status(500).send();
	}
});

module.exports = router;