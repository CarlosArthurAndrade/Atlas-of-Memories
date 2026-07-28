import { deleteData, updateData, getData, postData } from "@/hooks/fetchData";
import { Note, User } from "@/interfaces/http/DataTypes";
import {
    ChangeFavoriteStatusDataTypes,
    ChangeUsernameDataTypes, 
    CreateNoteDataTypes, 
    DeleteNotesParams, 
    GetNotesDataTypes, 
    GetUserDataTypes, 
    UpdateNoteDataTypes 
} from "../interfaces/notes.interfaces";

export async function getNotes({ token }: GetNotesDataTypes){
    try {
        const response = await getData<Note[]>(`http://localhost:3001/Notes`, token)
        return {
            message: response?.message,
            data: response?.data
        }
    } catch(err) {
        console.log(err)
    }
}

export async function deleteNote({ selectedNoteId, setSelectedNoteId, setNotes, setShowDeleteModal, notes }: DeleteNotesParams) {
    try {
        const token = localStorage.getItem('accessToken');
        const respose = await deleteData('http://localhost:3001/Notes', { id: selectedNoteId }, token!)
        if (respose?.statusCode === 200) {
            setSelectedNoteId(undefined)
            const newNotes = notes.filter(item => item.id !== selectedNoteId)
            setNotes(newNotes)
            return setShowDeleteModal(false)
        }
    } catch(error) {
        console.error(error)
    }
}

export async function updateNote({ text, title, noteId, token, setFiltredNotes, setShowEditNoteModal }: UpdateNoteDataTypes) {
    try{
        const updatedNote = { 
            title: title,
            messageText: text,
            writingDate: new Date().toLocaleDateString('pt-br'),
            noteId: noteId
        }
        const response = await updateData<Note>(`http://localhost:3001/Notes`, updatedNote, token)
        if (response?.statusCode === 200) {
            const userNotesData = await getData<Note[]>(`http://localhost:3001/Notes`, token)
            setFiltredNotes(userNotesData?.data!)
            setShowEditNoteModal(false)
        }
    } catch(error){
        console.error(error)
    }
}

export async function createNote({ title, messageText, token, setNotes, setShowCreateNoteModal}: CreateNoteDataTypes) {
    try{
        const newNote = { 
            title: title,
            messageText: messageText,
            writingDate: new Date().toLocaleDateString('pt-br'),
        }
        const response = await postData<Note>('http://localhost:3001/Notes', newNote, token)
        if(response?.statusCode == 200){
            const userNotesData = await getData<Note[]>(`http://localhost:3001/Notes`, token)
            setNotes(userNotesData?.data!)
            setShowCreateNoteModal(false)
        }
    } catch(error){
        console.error(error)
    }
}

export async function changeFavoriteStatus(data: ChangeFavoriteStatusDataTypes) {
    try {
        const response = await updateData('http://localhost:3001/Notes/favorite', {id: data.id}, data.token)
        if (response?.statusCode === 200){
            console.log('favorito trocado')
        }
    } catch (error) {
        console.error(error)
    }
}

export async function changeUsername({ username, token, setUsername, setShowChangeUsernameModal, setShowUserMenu }: ChangeUsernameDataTypes) {
    try {
        const response = await updateData<{ newUsername: string }>('http://localhost:3001/Users/update-username', {username: username}, token)
        if (response?.statusCode === 200){
            const userData = await getData<User>(`http://localhost:3001/Users/select-by-id`, token)
            setUsername(userData?.data?.username!)
            setShowChangeUsernameModal(false)
            setShowUserMenu(false)
        }
    } catch(err) {
        console.error(err)
    }
}

export async function getUser({ token }: GetUserDataTypes){
    try {
        const response = await getData<User>(`http://localhost:3001/Users/select-by-id`, token)
        return response?.data
    } catch(err) {
        console.error(err)
    }
}