import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useNotesData } from "./useNotesData"
import { useNoteFilters } from "./useNoteFilters"
import { useNoteModals } from "./useNoteModals"

export default function useNotes() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false)
    const [showChangeUsernameModal, setShowUsernameModal] = useState(false)

    useEffect(() => {
        const userToken =
            localStorage.getItem("accessToken")

        if (!userToken) {
            router.push("/")
            return
        }

        setToken(userToken)
    }, [router])

    const {
        notes,
        setNotes,
        username,
        setUsername,
    } = useNotesData(token)

    const {
        selectedMenuItem,
        search,
        filteredNotes,
        selectMenuItem,
        searchCard
    } = useNoteFilters(notes)

    const modals = useNoteModals(notes)

    const logout = () => {
        localStorage.removeItem("accessToken")
        router.push("/")
    }

    const openChangeUsername = () => {
        setShowUsernameModal(true)
    }

    const cancelChangeUsername = () => {
        setShowUsernameModal(false)
    }

    return {
        notes,
        setNotes,
        username,
        setUsername,

        token,
        logout,

        selectedMenuItem,
        search,
        filteredNotes,
        selectMenuItem,
        searchCard,

        ...modals,

        showUserMenu,
        setShowUserMenu,

        showChangeUsernameModal,
        showMobileSidebar,
        openChangeUsername,
        cancelChangeUsername,
        setShowUsernameModal,
        setShowMobileSidebar
    }
}