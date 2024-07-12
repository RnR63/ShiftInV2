import { Router } from "express";
import { requestController } from "../controllers/requestController.js";
const router = Router();

router.post("/create", requestController.createRequest, (req, res) => {
  return res.status(200).json('POST request to create a new request');
});

router.get("/all", requestController.getAllRequests, (req, res) => {
  return res.status(200).json("GET request to retrieve all requests");
});
 
// router.get("/updateStatus", (req, res) => {
//   return res.status(200).json('GET request for employee to see status update');
// });
 
router.patch("/updateStatus", requestController.updateStatus, (req, res) => { //will need request.id from query
  return res.status(200).json('PATCH request to update status of request');
});
 
router.patch("/cancel", (req, res) => {
  return res.status(200).json('PATCH request to cancel a request');
 });

export { router as requestsRouter}