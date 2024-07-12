import { pool } from '../utils/connect.js';

export const shiftController = {};

shiftController.getShiftSchedule = async (req, res, next) => {
    // const { id } = req.query;
    const { username } = res.locals;

    try { 
        const employeeShiftQuery = `
            SELECT shifts.date
            FROM shifts

            INNER JOIN schedule
            ON shifts.id = schedule.schedule_id
            
            INNER JOIN users
            ON users.id = schedule.user_id
            WHERE users.username = $1
            `;
        const response = await pool.query(employeeShiftQuery, [id]);
        if (response.rows.length > 0) { 
            res.locals.shifts = response.rows;
            return next();
        }
        return res.status(400).json({ message: 'No shifts found' })
    } catch (err) {
        return next({
            log: `shiftController.getShifts: ERROR ${err}`,
            status: 400,
            message: { err: 'Error occurred in shiftController.getShifts. Check server logs for more details.' }
        })
     }
};

shiftController.getAvailableShifts = async (req, res, next) => {
    try {
        const availableQuery = `
            SELECT *
            FROM shifts
            WHERE shifts.available = true
            `;
        const response = await pool.query(availableQuery);
        if (response.rows.length > 0) {
            res.locals.availableShifts = response.rows;
            return next();
        }
        return res.status(400).json({ message: 'No available shifts found' });
    } catch (err) {
        return next({
            log: `shiftController.getAvailableShifts: ERROR ${err}`,
            status: 400,
            message: { err: 'Error occurred in shiftController.getAvailableShifts. Check server logs for more details.' }
        })
    }
 };

shiftController.createShift = async (req, res, next) => {
    if (!res.locals.admin) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    const { date, requiredNumEmployees, currentNumEmployees } = req.body;
    const available = currentNumEmployees < requiredNumEmployees;

    try {
        const createShiftQuery = `
            INSERT INTO shifts (date, available, required_num_employees, current_num_employees)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `;
        const response = await pool.query(createShiftQuery, [date, available, requiredNumEmployees, currentNumEmployees]);
        res.locals.newShift = response.rows[0];
        return next();
    } catch (err) {
        return next({
            log: `shiftController.createShift: ERROR ${err}`,
            status: 400,
            message: { err: 'Error occurred in shiftController.createShift. Check server logs for more details.' }
        })
    }
 };


// // Returns a list of the shifts
// shiftController.getShifts = async (req, res, next) => {
//     // need to locate shifts from user:
//     // console.log('req.body', req.body) // as of now this is empty because nothing has been passed in, need cookie info from front end???

//     // get an array back from token of available shifts to send to frontend
//     // query the database

//     // assume we have access to username
//     const username = res.locals.username;
    

//     try {
//         // query the database
//         console.log('querying database...')
//         // Getting shifts from mongoDB
//         const shifts = await Shift.find({ employee: username }); // need to update user info on shifts db
//         console.log('found shifts:', shifts);

//         const availableShifts = await Shift.find({ available: true }); // fix if employee is null
//         console.log('found available shifts: ', availableShifts);

//         // persist the data
//         res.locals.shifts = shifts;
//         res.locals.availableShifts = availableShifts;

//         // return next
//         return next();
//     } catch(err) {
//         return next({
//             log: `shiftController.getShifts: ERROR ${err}`,
//             status: 400,
//             message: {err: 'Error occurred in shiftController.getShifts. Check server logs for more details.'}
//         })
//     }
// }



// // Pickup a shift
// shiftController.pickupShift = async (req, res, next) => {
//     console.log('PATCH request to /addshift');
//     console.log('req.params contains: ', req.params);
//     console.log('req.body contains: ', req.body);

//     // create variable shift and assign to req.params
//     const { shiftId } = req.params;

//     // reassign documentId to shiftId
    
//     // assume that we have the id of the shift
//     const documentId = '65d4509bb16cad119f9df9d8'; // attempting to pickup shift
//     // assume that we have the username of the user that is logged in
//     const username = 'santa';
    
    
//     try {
//         // query database
//         console.log('updating shift database...')

//         //get shifts with matching id from mongoDb
//         const matchingShifts = await Shift.findOneAndUpdate(
//             {_id: documentId}, // search criteria
//             {$set: {
//                 employee: username,
//                 available: false,
//             }}, // the updates
//         )
        
//         // persist data
//         res.locals.shiftAdded = matchingShifts;
//         console.log('res.locals.shiftAdded: ', res.locals.shiftAdded);    

//         // return next
//         console.log('exiting shiftController.pickupShift');
//         return next();
//     } catch(err) {
//         return next({
//             log: `shiftController.pickupShift: ERROR ${err}`,
//             status: 400,
//             message: {err: 'Error occurred in shiftController.pickupShift. Check server logs for more details.'}
//         });
//     }   
// }

// // Drop a shift
// shiftController.dropShift = (req, res, next) => {
//     console.log('PATCH request to /drop');
//     console.log('req.body contains: ', req.body);
    
//     return next();
// }

// Export shiftController
// module.exports = shiftController;