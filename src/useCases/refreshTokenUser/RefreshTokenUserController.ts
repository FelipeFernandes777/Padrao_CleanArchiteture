import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

class RefreshTokenUserController {
	async handle(request: Request, response: Response) {
		const { refresh_token } = request.body;

		const refreshTokenUserUserUseCase = new RefreshTokenUserUseCase();

		const token = await refreshTokenUserUserUseCase.execute(refresh_token);

		return response.send(token);
	}
}

export { RefreshTokenUserController };
