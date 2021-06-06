import jwt, {Secret} from "jsonwebtoken";

export function auth(request: any, response: any, next: any) {
	try {
		const token = request.cookies.token;
		if (!token) {
			return response.status(401).json({ errorMessage: 'Unauthorized' });
		}

		const validatedUser: { id: string } = jwt.verify(token, process.env.JWT_SECRET as Secret) as { id: string };		// Throws an error if verification fails.
		request.user = validatedUser.id;

		next();
	} catch (error) {
		return response.status(401).json({ errorMessage: 'Unauthorized' });
	}
}