import "server-only";
import mysql from "mysql2/promise";


const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_NAME;

const pool = mysql.createPool({ host: dbHost, user: dbUser, password: dbPassword, database: dbDatabase });
export default pool;