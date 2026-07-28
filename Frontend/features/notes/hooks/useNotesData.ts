import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Note, User } from "@/interfaces/http/DataTypes"
import {
    getUser,
    getNotes
} from "../services/notes.service"

export function useNotesData(token: string) {
    const [notes, setNotes] = useState<Note[]>([])
    const [username, setUsername] = useState<string>()

    const router = useRouter()

    useEffect(() => {
        if (!token) return

        const fetchData = async () => {
            try {
                const notesResponse = await getNotes({ token })
                const userResponse = await getUser({ token })

                if (notesResponse?.message === "Token inválido") {
                    localStorage.removeItem("accessToken")
                    router.push("/")
                    return
                }

                setNotes(notesResponse?.data ?? [])
                setUsername(userResponse?.username)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [token, router])

    return {
        notes,
        setNotes,
        username,
        setUsername,
    }
}