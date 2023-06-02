import { Response, Router } from "express";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);

router.get("/courses", ensureAuthenticated, (_, response: Response) => {
	return response.json([
		{ id: 1, name: "NodeJS" },
		{ id: 2, name: "ReactJS" },
		{ id: 3, name: "TypeScript" },
		{ id: 4, name: "ReactNative" },
		{ id: 5, name: "Fluter" },
	]);
});

export { router };
