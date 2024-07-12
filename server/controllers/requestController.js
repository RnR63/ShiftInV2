import { pool } from "../utils/connect.js";

export const requestController = {};

requestController.getAllRequests = async (req, res, next) => { 
  const username = res.locals.username;

  try {
    const requestQuery = `
      SELECT *
      FROM requests
    
      INNER JOIN staff ON requests.staff_id = staff.id
      WHERE staff.username = $1
    `;
    const response = await pool.query(requestQuery, [username]);
    if (response.rows.length > 0) {
      res.locals.requests = response.rows;
      return next();
    }
    return res.status(400).json({ message: 'No requests found' });
   } catch (err) {
    return next({
      log: `requestController.getAllRequests: ERROR ${err}`,
      status: 400,
      message: { err: 'Error occurred in requestController.getAllRequests. Check server logs for more details.' }
    });
  }
};

requestController.createRequest = async (req, res, next) => {
  const { username } = res.locals;
  const { requestType, id, recievingstaffID } = req.body;

  // Check if recievingstaffID is required based on requestType
  if (requestType === "swap" && !recievingstaffID) {
    return res.status(400).json({error: "Missing recievingstaffID for requestType 'someSpecificType'"});
  }

  // Validate requestType, id, and username
  if (!requestType || !id || !username) {
    return res.status(400).json({ error: "Missing data" });
  }

  // Proceed with the rest of your logic
  try {
    const createRequestQuery = `
      INSERT INTO requests (requestType, id, username, recievingstaffID)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(createRequestQuery, [requestType, id, username, recievingstaffID]);
    if (result.rowCount > 0) {
      res.locals.newRequest = result.rows[0];
      return next();
    }
  } catch (err) {
    next(err);
  }
};

// requestController.requestDrop = async (req, res, next) => {};

// requestController.requestSwap = async (req, res, next) => { };

requestController.updateStatus = async (req, res, next) => {
  if (!res.locals.admin) return res.status(401).json({ message: 'Unauthorized' });
  const { username } = res.locals;
  const { id, status, requestType, recievingstaffID } = req.body;
  const statusChoice = ['approved', 'pending', 'denied'];

  if (
    !id ||
    !statusChoice.includes(status) ||
    !requestType
  ) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    let updateStatusQuery;
    if (requestType !== 'swap') {
      updateStatusQuery = `
        UPDATE requests
        SET status = $1
        WHERE id = $2
        RETURNING *;
      `;
    } else {
      updateStatusQuery = `
        BEGIN;
        UPDATE requests
        SET status = $1
        WHERE id = $2
        RETURNING *;

        UPDATE schedule
        


      `;
    }
 
    const update = await pool.query(updateStatusQuery, [status, id]);
    if (update.rowCount > 0) {
      res.locals.updateStatus = update.rows[0];
      return next();
    }
  } catch (err) {
    return next({
      log: `requestController.updateStatus: ERROR ${err}`,
      status: 400,
      message: { err: 'Error occurred in requestController.updateStatus. Check server logs for more details.' }
    });
  }

};

requestController.cancelRequest = async (req, res, next) => {};
