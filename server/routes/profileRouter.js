import { Router } from "express";
import { settingsRouter } from "./settingsRouter.js";
import { shiftRouter } from "./shiftRouter.js";
import { requestsRouter } from "./requestsRouter.js";
const router = Router();

router.use('/settings', settingsRouter);
router.use('/shifts', shiftRouter);
router.use('/requests', requestsRouter);

export { router as profileRouter };
