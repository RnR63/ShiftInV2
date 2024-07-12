import { Router } from "express";
import { shiftController } from "../controllers/shiftController.js";
const router = Router();

/**
 * 1. Verify token session
 ✅ 2. Retrieve Employee Shifts
 ✅ 3. Retrieve Available Shifts
 ✅ 4. Retrieve Employee Requests
 */
router.get("/", shiftController.getShiftSchedule, shiftController.getAvailableShifts, requestController.getAllRequests, (req, res) => {
  const { shifts, availableShifts, requests } = res.locals;
  return res.status(201).json({ shifts, availableShifts, requests});
});

export { router as dashboardRouter };
