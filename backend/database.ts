//REMEMBER: IF YOU WANT TO INSTALL A PACKAGE USE THIS COMMAND!
// "npx expo install anypakage"
//NOT THIS: "npm install anypakage" your code and nodejs will break

// src/db.config.ts
import mysql, { PoolOptions } from 'mysql2/promise'; // Use 'mysql2/promise' for async/await

const poolConfig: PoolOptions = {
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your password
  database: 'e_print', // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const database = mysql.createPool(poolConfig);

export default database;
