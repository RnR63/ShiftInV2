import { Router } from 'express';
import { shiftController } from '../controllers/shiftController.js';
const router = Router();

router.post('/create', shiftController.createShift, (req, res) => { 
   return res.status(200).json(res.locals.newShift);
});

router.get('/staff', shiftController.getShiftSchedule, (req, res) => { 
   return res.status(200).json(res.locals.shifts);
});

//bug: will only find available shifts at this moment
router.get('/filter', shiftController.getAvailableShifts, (req, res) => { 
   return res.status(200).json('GET request for all available shifts');
});


export { router as shiftRouter };
 