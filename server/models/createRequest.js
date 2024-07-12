/**
 * id -> requestID
 * status -> status ('approved', 'pending', 'denied') 
 * requestType -> requestType ('drop', 'swap', 'pickup') 
 * username -> username
 * recievingstaffID
 * const queryArr = [id, status, requestType, username, recievingstaffID];
 *  */

const createRequest = (status, requestType) => {
  let request = ``;

  // if requestType is 'pickup' && status is 'approved'
  if (requestType === 'pickup' && status === 'approved') {
    request = `
        BEGIN;
        UPDATE requests
        SET status = $2
        WHERE id = $1
        RETURNING *;

        INSERT INTO schedule (staff_ID, shift_ID)
        SELECT staff.ID, shifts.ID
        FROM staff
        JOIN shifts ON shifts.date = $2
        WHERE staff.username = $4
        RETURNING *;
        COMMIT;
        `;
  }

  if (requestType === 'drop' && status === 'approved') {
    request = `
        BEGIN;
        UPDATE requests
        SET status = $1
        WHERE id = $2
        RETURNING *;

        DELETE FROM schedule
        WHERE staff_ID = (
          SELECT staff.ID
          FROM staff
          WHERE staff.username = $1
        )
        AND shift_ID = $1
        COMMIT;
        `;
  }
 

  return request;
}