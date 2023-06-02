import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const authToken = request.headers.authorization;

	if (!authToken) {
		return response.status(401).json({
			message: "Token is missing!",
		});
	}

	//Bear | Token
	const [_, token] = authToken.split(" ");

	try {
		const secretKey = "ebb3b92c-c1c6-4d3b-a9f6-1aa930655fb7";
		verify(token, secretKey);

		return next();
	} catch (error) {
		return response.status(401).send({
			message: "Token Invalid",
		});
	}
}
