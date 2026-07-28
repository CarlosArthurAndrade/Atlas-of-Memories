export interface Note {
    id: number
    title: string
    messageText: string
    color: string
    authorId: number
    writingDate: string
    favorite: number
}

export interface User {
    id: number
    username: string
    email: string
    password: string
}

export interface NoteResponseData {
    id?: number
    title: string
    messageText: string
    color: string
    favorite: boolean
    writingDate: string
    index: number
    openDeleteModal: (id: number) => void
    openEditModal: (id: number) => void,
    onclickFavoriteButton: (id: number) => void
}