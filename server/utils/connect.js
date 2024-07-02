import pg from 'pg';

// creating a new pool instance and half connects to the DB, until .connect or .query is invoked (happens on line 12)
export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

// create connection to async to database.
async function dbConnect() {
    try {
        const res = await pool.query('SELECT NOW ()');
        console.log('Connected to that shit @ ', res.rows[0].now);
    } catch (error) {
        console.log('Failed to connect to that shit', error);
    }
};

export default dbConnect;

