import { hash } from "bcrypt";

import { client } from "../../prisma/client";

interface IUserRequest {
	name: string;
	password: string;
	userName: string;
}

class CreateUserUseCase {
	async execute({ name, userName, password }: IUserRequest) {
		// Verificar se o usuario existe
		const userAlreadyExists = await client.user.findFirst({
			where: {
				userName,
			},
		});

		if (userAlreadyExists) {
			throw new Error("User Already Exists");
		}

		//Cadastra o usuario

		const passwordHash = await hash(password, 8);

		const user = await client.user.create({
			data: {
				name,
				userName,
				password: passwordHash,
			},
		});
		return user;
	}
}

export { CreateUserUseCase };
