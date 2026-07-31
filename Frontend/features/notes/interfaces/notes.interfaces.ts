import { Note } from "@/interfaces/http/DataTypes"
import { LegacyRef } from "react"

export interface UpdateNoteDataTypes {
    title: string, 
    text: string,
    setFiltredNotes: (filtredNotesArray: Note[]) => void,
    setShowEditNoteModal: (boolean: boolean) => void,
    noteId: number,
    token: string
}

export interface CreateNoteDataTypes {
    title: string, 
    messageText: string,
    token: string,
    setNotes: (NewArray: Note[]) => void,
    setShowCreateNoteModal: (boolean: boolean) => void
}

export interface ChangeFavoriteStatusDataTypes {
    id: number,
    token: string
}

export interface ChangeUsernameDataTypes {
    username: string,
    token: string
    setUsername: (username: string) => void
    setShowUserMenu: (boolean: boolean) => void
    setShowChangeUsernameModal: (boolean: boolean) => void
}

export interface DeleteNotesParams {
    selectedNoteId: number,
    setSelectedNoteId: (id: number | undefined) => void,
    setNotes: (NewArray: Note[]) => void,
    setShowDeleteModal: (boolean: boolean) => void,
    notes: Note[]
}

export interface GetNotesDataTypes {
    token: string
}

export interface GetUserDataTypes {
    token: string
}

export interface EditNoteModalDataParams {
    title: string,
    text: string
}

export interface UseNoteParams {
    favorite: boolean,
    writingDate: string
}

export interface NotesGridPropTypes {
    notes: Note[], 
    firstColumnNotes: Note[], 
    secondColumnNotes: Note[], 
    selectedMenuItem: string,
    token: string,
    searchCard: (event: React.ChangeEvent<HTMLInputElement>) => void
    openEditModal: (id: number) => void, 
    openDeleteModal: (id: number) => void,
    openSidebar: (boolean: boolean) => void
}

export interface SidbarPropTypes {
    selectMenuItem: (name: string) => void, 
    username: string,
    selectedMenuItem: string
    openCreateModal: () => void, 
    openChangeUsername: () => void, 
    showUserMenu: boolean, 
    logout: () => void, 
    setShowUserMenu: (boolean: boolean) => void
}

export interface UserMenuPropTypes {
    username: string,
    openChangeUsername: () => void, 
    showUserMenu: boolean, 
    logout: () => void, 
    setShowUserMenu: (boolean: boolean) => void
}

export interface MobileSidebarPropTypes {
    selectMenuItem: (name: string) => void, 
    username: string,
    selectedMenuItem: string
    openCreateModal: () => void, 
    openChangeUsername: () => void, 
    showUserMenu: boolean, 
    logout: () => void, 
    setShowUserMenu: (boolean: boolean) => void
    setShowMobileSidebar: (boolean: boolean) => void
    divRef: LegacyRef<HTMLDivElement>
}