import dotenv from 'dotenv';
import { Request, Response } from "express";
import { LoginResponse, UserReturn } from "../interfaces/user";
import { connection } from "../config/mysql.config";
import { QUERY } from "../querys/users.query";
import { Code } from "../enums/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enums/status.enum";
import crypto from "crypto";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import UserAuthRequest, { PasswordResetToken } from '../interfaces/expressUser';
import { sendResetEmail } from '../utils/sendEmail';

dotenv.config();

export const loginUser = async (req: UserAuthRequest, res: Response): Promise<Response<LoginResponse>> => {
    const { email, password } = req.body
    try {
        const pool = await connection();
        const [rows] = await pool.query<UserReturn[]>(QUERY.SELECT_USER, [email]);
        if(await bcrypt.compare(password, rows[0].password)){
            const token = jwt.sign({id: rows[0].id}, process.env.CHAVE_SECRETA_JWT || 'Chave Secreta', { expiresIn: '3h'})
            return res.status(Code.OK).send(new HttpResponse<{ token: string}>(Code.OK, Status.OK, 'Usuário encontrado', { token: token} ));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Email ou senha incorretos'))
        }
    } catch(error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const getUserById = async (req: UserAuthRequest, res: Response): Promise<Response<UserReturn>> => {
    const id  = req.user
    try {
        const pool = await connection();
        const [rows] = await pool.query<UserReturn[]>(QUERY.SELECT_USER_ID, [id]);
        if(rows[0]){
            return res.status(Code.OK).send(new HttpResponse<UserReturn>(Code.OK, Status.OK, 'Usuário encontrado', rows[0] ));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Usuário não encontrado', []))
        }
    } catch(error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const createUser = async (req: UserAuthRequest, res: Response): Promise<Response<UserReturn>> => {
    const { username, email, password } = req.body
    try {
        const pool = await connection();
        const [rows] = await pool.query<UserReturn[]>(QUERY.SELECT_USER, [email]);
        if(rows[0]){
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Usuário já cadastrado'))
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const [rows] = await pool.query<UserReturn[]>(QUERY.CREATE_USER, [username, email, hashPassword])
            return res.status(Code.OK).send(new HttpResponse<UserReturn>(Code.OK, Status.OK, 'Usuário cadastrado', rows[0]));
        }
    } catch(error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const findUserByEmail = async (req: UserAuthRequest, res: Response) => {
    const { email } = req.body
    try {
        const pool = await connection();
        const [rows] = await pool.query<UserReturn[]>(QUERY.SELECT_USER_EMAIL, [email]);
        if(rows[0]) {
            return res.status(Code.OK).send(new HttpResponse<{ id: number }>(Code.OK, Status.OK, 'Usuário encontrado', { id: rows[0].id } ));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Usuário não encontrado', []))
        }
    } catch(err) {
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const changeUserPassword = async (req: UserAuthRequest, res: Response) => {
    const { newPassword, userId } = req.body
    const hashPassword = await bcrypt.hash(newPassword, 10);
    try {
        const pool = await connection();
        await pool.query(QUERY.CHANGE_USER_PASSWORD, [hashPassword, userId])
        return res.status(Code.OK).send(new HttpResponse<UserReturn>(Code.OK, Status.OK, 'Senha alterada'));
    } catch(err) {
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', err))
    }
}

export const changeUserUsername = async (req: UserAuthRequest, res: Response) => {
    const { username } = req.body
    const id  = req.user
    try {
        const pool = await connection();
        await pool.query(QUERY.CHANGE_USER_USERNAME, [username, id])
        return res.status(Code.OK).send(new HttpResponse<UserReturn>(Code.OK, Status.OK, 'Username alterado'));
    } catch(err) {
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', err))
    }
}

export const saveResetToken = async (req: UserAuthRequest, res: Response) => {
    const { userId, emailInputValue } = req.body
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    try {
        const pool = await connection();
        await pool.query(QUERY.SAVE_RESET_TOKEN, [userId, tokenHash, expiresAt])
        sendResetEmail(emailInputValue, token)
        res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK))
    } catch (err) {
        res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', { err }))
    }
}

export const findResetToken = async (req: UserAuthRequest, res: Response) => {
    const { token } = req.body
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    try {
        const pool = await connection();
        const [rows] = await pool.query<PasswordResetToken[]>(QUERY.SELECT_TOKENHASH, [tokenHash])
        if(rows[0]){
            res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Token Encontrado', { id: rows[0].id, userid: rows[0].userId }))
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Token não encontrado ou inválido'))
        }
    } catch (err) {
        res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const deleteResetToken = async (req: UserAuthRequest, res: Response) => {
    const { id } = req.body
    try {
        const pool = await connection();
        const [rows] = await pool.query<PasswordResetToken[]>(QUERY.DELETE_TOKENHASH, [id])
        res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Token Encontrado', rows[0]))
    } catch (err) {
        res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}