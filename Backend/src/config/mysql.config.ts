import { createPool } from "mysql2/promise";
import 'dotenv/config';

const CONNECTION_LIMIT = 10

export const connection = async () => {
    const pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        connectionLimit: CONNECTION_LIMIT,
    })
    return pool;
}