import { useState } from "react"
import { Note } from "@/interfaces/http/DataTypes"

export function useNoteModals(notes: Note[]) {
    const [selectedNoteId, setSelectedNoteId] =
        useState<number | undefined>()

    const [showDeleteModal, setShowDeleteModal] =
        useState(false)

    const [showCreateNoteModal, setShowCreateNoteModal] =
        useState(false)

    const [showEditModal, setShowEditModal] =
        useState(false)

    const [selectedNoteTitle, setSelectedNoteTitle] =
        useState("")

    const [selectedNoteText, setSelectedNoteText] =
        useState("")

    const openDeleteModal = (id: number) => {
        setSelectedNoteId(id)
        setShowDeleteModal(true)
    }

    const cancelDelete = () => {
        setSelectedNoteId(undefined)
        setShowDeleteModal(false)
    }

    const openCreateModal = () => {
        setShowCreateNoteModal(true)
    }

    const cancelCreate = () => {
        setShowCreateNoteModal(false)
    }

    const openEditModal = (id: number) => {
        const note = notes.find(note => note.id === id)

        if (!note) return

        setSelectedNoteId(id)
        setSelectedNoteTitle(note.title)
        setSelectedNoteText(note.messageText)
        setShowEditModal(true)
    }

    const cancelEdit = () => {
        setSelectedNoteId(undefined)
        setShowEditModal(false)
    }

    return {
        selectedNoteId,
        selectedNoteTitle,
        selectedNoteText,

        showDeleteModal,
        showCreateNoteModal,
        showEditModal,

        openDeleteModal,
        cancelDelete,

        openCreateModal,
        cancelCreate,

        openEditModal,
        cancelEdit,

        setShowDeleteModal,
        setShowCreateNoteModal,
        setShowEditModal,

        setSelectedNoteId
    }
}