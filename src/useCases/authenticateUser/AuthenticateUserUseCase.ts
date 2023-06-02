import jsonwebtoken from "jsonwebtoken";
import { compare } from "bcrypt";

import { client } from "../../prisma/client";
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
	userName: string;
	password: string;
}

class AuthenticateUserUseCase {
	async execute({ userName, password }: IRequest) {
		//Verifcar se o usuario existe

		const userAlreadyExists = await client.user.findFirst({
			where: {
				userName,
			},
		});

		if (!userAlreadyExists) {
			throw new Error("User or password incorrect!");
		}

		//Verificar se a senha está correta

		const passwordMatch = await compare(password, userAlreadyExists.password);

		if (!passwordMatch) {
			throw new Error("User or password incorrect!");
		}

		const generateRefreshToken = new GenerateRefreshTokenProvider();

		//Gerar o token do Usuario

		//Deleta os tokens já criados
		await client.refreshToken.deleteMany({
			where: {
				userId: userAlreadyExists.id,
			},
		});

		const generateTokenProvider = new GenerateTokenProvider();
		const token = await generateTokenProvider.execute(userAlreadyExists.id);

		//Criando o RefreshToken
		const refreshToken = await generateRefreshToken.execute(
			userAlreadyExists.id
		);

		return { token, refreshToken };
	}
}

export { AuthenticateUserUseCase };
