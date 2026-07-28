import { Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, setFavoriteNote, updateNote } from "../controllers/notes.controller";
import verifyLoginToken from "../middlewares/verifyLoginTokenMiddleware";

const notesRoutes = Router();

notesRoutes.route('/')
    .post(verifyLoginToken, createNote)
    .delete(verifyLoginToken, deleteNote)
    .get(verifyLoginToken, getNotes)
    .put(verifyLoginToken, updateNote)

notesRoutes.route('/:noteId')
    .get(verifyLoginToken, getNoteById)

notesRoutes.route('/favorite')
    .put(verifyLoginToken, setFavoriteNote)


export default notesRoutes;