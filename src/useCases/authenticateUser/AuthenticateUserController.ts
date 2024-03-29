import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
	async handle(request: Request, response: Response) {
		const { userName, password } = request.body;

		const authenticateUserUseCase = new AuthenticateUserUseCase();

		const token = await authenticateUserUseCase.execute({
			userName,
			password,
		});

		return response.json({ token: token });
	}
}

export { AuthenticateUserController };
