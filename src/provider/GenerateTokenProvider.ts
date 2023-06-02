import jsonwebtoken from "jsonwebtoken";

class GenerateTokenProvider {
	async execute(userId: string) {
		//Gerar token do usuario

		const secretKey = "ebb3b92c-c1c6-4d3b-a9f6-1aa930655fb7";
		const token = jsonwebtoken.sign({}, secretKey, {
			subject: userId,
			expiresIn: "20s",
		});

		return token;
	}
}

export { GenerateTokenProvider };
