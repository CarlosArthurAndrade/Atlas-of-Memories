import { Request } from "express";
import { RowDataPacket } from "mysql2";

export default interface UserAuthRequest extends Request {
    user?: number
}

export interface PasswordResetToken extends RowDataPacket {
    id: number
    userId: number
    tokenHash: string
    expiresAt: Date
}
