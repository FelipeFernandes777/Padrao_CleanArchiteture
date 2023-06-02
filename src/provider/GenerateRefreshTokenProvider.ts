import dayjs from "dayjs";

import { client } from "../prisma/client";

class GenerateRefreshTokenProvider {
	async execute(userId: string) {
		//Criando o tempo de expiração com o Refresh Token
		const expiresIn = dayjs().add(15, "second").unix();

		//Gerando o Refresh Token
		const generateRefreshToken = await client.refreshToken.create({
			data: {
				userId,
				expiresIn,
			},
		});

		return generateRefreshToken;
	}
}

export { GenerateRefreshTokenProvider };
