import { Router } from "express";
const router = Router();

router.get('/:id', (req, res) => { 
  console.log('we are in the server')
  return res.status(200).send('GET request to /employee');
});

export { router as employeeRouter };
