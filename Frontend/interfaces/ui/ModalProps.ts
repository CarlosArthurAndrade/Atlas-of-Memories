import { ChangeUsernameDataTypes, CreateNoteDataTypes, DeleteNotesParams, UpdateNoteDataTypes } from "@/features/notes/interfaces/notes.interfaces"
import { Note } from "../http/DataTypes"

export interface DeleteNoteModalProps {
    selectedNoteId: number,
    setSelectedNoteId: (id: number | undefined) => void,
    setNotes: (notes: Note[]) => void,
    setShowDeleteModal: (boolean: boolean) => void,
    notes: Note[],
    onConfirm: ({ selectedNoteId, setSelectedNoteId, setNotes, setShowDeleteModal, notes }: DeleteNotesParams) => void
    onCancel: () => void
}

export interface EditModalProps {
    title: string,
    text: string,
    noteId: number,
    token: string,
    onCancel: () => void,
    setFiltredNotes: (notes: Note[]) => void,
    setShowEditModal: (boolean: boolean) => void,
    onConfirm: ({ text, title, noteId, token, setFiltredNotes, setShowEditNoteModal }: UpdateNoteDataTypes) => Promise<void>
}

export interface CreateModalProps {
    token: string,
    onCancel: () => void,
    setNotes: (notes: Note[]) => void,
    setShowCreateNoteModal: (boolean: boolean) => void
    onConfirm: ({ title, messageText, token, setNotes, setShowCreateNoteModal}: CreateNoteDataTypes) => void
}

export interface ChangeUsernameModalProps {
    onCancel: () => void
    onConfirm: (data: ChangeUsernameDataTypes) => Promise<void>
    token: string
    setUsername: (username: string) => void
    setShowUserMenu: (boolean: boolean) => void
    setShowChangeUsernameModal: (boolean: boolean) => void
}