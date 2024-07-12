import { Router } from "express";
import { userController } from "../controllers/userController.js";
const router = Router();

router.post("/", userController.createEmployee, (req, res) => {
    return res.status(201).send('You are now employed, get to work! fucking smile!')
});


export { router as registerRouter };
