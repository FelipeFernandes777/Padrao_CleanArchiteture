import dayjs from "dayjs";

import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {
	async execute(refresh_token: string) {
		const refreshToken = await client.refreshToken.findFirst({
			where: {
				id: refresh_token,
			},
		});

		if (!refreshToken) {
			throw new Error("Refresh Token invalid!");
		}

		const refreshTokenExpired = dayjs().isAfter(
			dayjs().unix(refreshToken.expiresIn)
		);

		const generateTokenProvider = new GenerateTokenProvider();
		const token = await generateTokenProvider.execute(refreshToken.userId);

		if (refreshTokenExpired) {
			await client.refreshToken.deleteMany({
				where: {
					userId: refreshToken.userId,
				},
			});
			const generateTokenProvider = new GenerateTokenProvider();

			const newRefreshToken = await generateTokenProvider.execute(
				refreshToken.userId
			);

			return { token, newRefreshToken };
		}

		return { token };
	}
}

export { RefreshTokenUserUseCase };
