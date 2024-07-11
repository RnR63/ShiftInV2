import { pool } from '../utils/connect.js'

async function createTables () {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "staff"(
      ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      employee_number INT UNIQUE NOT NULL,
      position VARCHAR(255) NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "shifts"(
      ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      date DATE NOT NULL,
      filled BOOLEAN NOT NULL,
      neededNumEmployees INT NOT NULL,
      currentNumEmployees INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "schedule"(
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      staff_ID INT NOT NULL,
      shift_ID INT NOT NULL,
      FOREIGN KEY (staff_ID) REFERENCES staff(ID) ON DELETE CASCADE,
      FOREIGN KEY (shift_ID) REFERENCES shifts(ID) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "requests"(
      ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      request_type VARCHAR(255) NOT NULL,
      shift_ID INT NOT NULL,
      droppingstaffID INT NOT NULL,
      recievingstaffID INT,
      approved VARCHAR(255),
      FOREIGN KEY (shift_ID) REFERENCES shifts(ID) ON DELETE CASCADE
    );
  `;

  try {
    const res = await pool.query(createTableQuery);
    if (res) console.log(`Created tables at ${new Date().toISOString()}`);
  } catch (err) {
    console.log(`Error creating tables due to ${err.message}`)
  }
};

export default createTables;