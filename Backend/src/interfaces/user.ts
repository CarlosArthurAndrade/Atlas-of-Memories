import { RowDataPacket } from "mysql2";

export interface UserReturn extends RowDataPacket {
    id: number,
    email: string,
    username: string
}

export interface LoginResponse {
    userId: number,
    token: string
}