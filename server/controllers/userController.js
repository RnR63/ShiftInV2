import { pool } from '../utils/connect.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const userController = {};

/**
 * Need to add that position must be either 'employee' or 'admin'
 */
userController.createEmployee = async (req, res, next) => { 
    /** check for admin status, and have the route authenticate admin access */
    // if (!res.locals.admin) return res.status(401).json({ message: "Unauthorized" });

    const { username, email, password, firstName, lastName, employee_number, position } = req.body;
    if (!username || !email || !password || !firstName || !lastName || !employee_number || !position) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
    try {
       
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // query to insert a new user
        const newUserQuery = `
            INSERT INTO staff(employee_number, position, firstName, lastName, username, email, password)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT DO NOTHING
            RETURNING *;
            `;
        
        // const { rows } = await pool.query(newUserQuery, [employee_number, position, firstName, lastName, username, email, hashedPassword]);
        // res.locals.user = rows[0];
        const response = await pool.query(newUserQuery, [employee_number, position, firstName, lastName, username, email, hashedPassword]);
        console.log('response', response)

        if (response.rows.length > 0) {
            res.locals.user = response.rows[0];
            return next();
        } else {
            return res.status(500).json({ message: "An error occurred", error });
        }
      } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
      }
};


userController.loginEmployee = async (req, res, next) => { 
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ message: "Please provide all required fields" });
    }
    try { 

        const userQuery = `
            SELECT *
            FROM staff
            WHERE username = $1;
        `;
        const response = await pool.query(userQuery, [username]);
        const user = response.rows[0];
        
        if (response.rows.length === 0) {
            return res.status(401).json('Invalid credentials');
        }

        if (await bcrypt.compare(password, user.password)) {
            res.locals.user = user; 
            return next();
        } else {
            return res.status(401).json('Invalid credentials');
        }

    } catch (error){ 
        return res.status(500).json({ message: "An error occurred", error });
    }
};


/**
 * may want to change username to something like employee_number as well how to extract the identifier (req.body, params, query?)
 */
userController.updatePassword = async (req, res, next) => { 
    const { newPassword, oldPassword, username } = req.body;

    try { 
        const getOldPasswordQuery = `
            SELECT username, password
            FROM staff
            WHERE username = $1;
        `;
        const response = await pool.query(getOldPasswordQuery, [username]);
        const hashedPassword = response.rows[0].password;

        if (await bcrypt.compare(oldPassword, hashedPassword)) {
            const updatePasswordQuery = `
                UPDATE staff
                SET password = $1
                WHERE username = $2
            `;
            const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
            const update = await pool.query(updatePasswordQuery, [newHashedPassword, username]);
            if (update.rowCount === 1) return next()
        } else {
            return res.status(500).json({ message: "An error occurred" });
        }
    } catch (error) { 
        return res.status(500).json({ message: "An error occurred", error });
    }
};

/**
 * Admin archives employee account
 */
userController.archiveEmployee = async (req, res, next) => {};

