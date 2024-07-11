import { Router } from "express";
import { userController } from "../controllers/userController.js"
import cookieController from "../controllers/cookieController.js";
import tokenController from "../controllers/tokenController.js";

const router = Router();

router.post("/", userController.loginEmployee, tokenController.createToken, cookieController.createCookie, (req, res) => {
    return res.status(200).send('POST request to /login');
});

export { router as loginRouter };