import { Request, Response } from "express";
import Note from "../interfaces/note";
import { connection } from "../config/mysql.config";
import { QUERY } from "../querys/notes.query";
import { Code } from "../enums/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enums/status.enum";
import userAuthRequest from "../interfaces/expressUser";

export const getNotes = async (req: userAuthRequest, res: Response): Promise<Response<Note[]>> => {
    const userId  = req.user
    try {
        const pool = await connection();
        const [rows] = await pool.query<Note[]>(QUERY.SELECT_NOTES, [userId]);
        if(rows[0]){
        return res.status(Code.OK).send(new HttpResponse<Note[]>(Code.OK, Status.OK, 'Anotações recebidas', rows));
        } else {
            return res.status(Code.OK).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Usuário não possui anotações', []))
        }
    } catch(error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const getNoteById = async (req: userAuthRequest, res: Response): Promise<Response<Note>> => {
    const { noteId } = req.params
    try{
        const pool = await connection();
        const [rows] = await pool.query<Note[]>(QUERY.SELECT_NOTE_BY_ID, [noteId]);
        if(rows[0]){
        return res.status(Code.OK).send(new HttpResponse<Note>(Code.OK, Status.OK, 'Anotação encontrada', rows[0]));
        } else {
            return res.status(Code.OK).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Anotação não encontrada', []))
        }
    } catch (error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const createNote = async (req: userAuthRequest, res: Response): Promise<Response<Note>> => {
    const { title, messageText, writingDate } = req.body
    const userId  = req.user
    try {
        const pool = await connection();
        const [rows] = await pool.query<Note[]>(QUERY.CREATE_NOTE, [title, messageText, userId, writingDate]);
        return res.status(Code.OK).send(new HttpResponse<Note>(Code.OK, Status.OK, 'Anotação criada', rows[0]));
    } catch(error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const updateNote = async (req: userAuthRequest, res: Response): Promise<Response<Note>> => {
    const { title, messageText, writingDate, noteId } = req.body
    try {
        const pool = await connection();
        const [rows] = await pool.query<Note[]>(QUERY.UPADTE_NOTE, [title, messageText, writingDate, noteId]);
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Anotação atualizada', rows[0]));
    } catch(error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const deleteNote = async (req: userAuthRequest, res: Response): Promise<Response> => {
    const { id } = req.body
    try {
        const pool = await connection();
        await pool.query(QUERY.DELETE_NOTE, [id]);
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Anotação removida'));
    } catch(error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}

export const setFavoriteNote = async (req: userAuthRequest, res: Response): Promise<Response> => {
    const { id } = req.body
    try {
        const pool = await connection();
        await pool.query(QUERY.FAVORITE_NOTE, [id])
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Status de favorito trocado com sucesso' ));
    } catch (error: unknown){
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro'))
    }
}