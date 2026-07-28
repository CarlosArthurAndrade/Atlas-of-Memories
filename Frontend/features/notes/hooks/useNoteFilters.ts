import { useMemo, useState } from "react"
import { Note } from "@/interfaces/http/DataTypes"

export function useNoteFilters(notes: Note[]) {
    const [selectedMenuItem, setSelectedMenuItem] = useState("Todas as notas")
    const [search, setSearch] = useState("")

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            const matchesFavorite =
                selectedMenuItem === "Todas as notas" ||
                note.favorite === 1

            const matchesSearch =
                note.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

            return matchesFavorite && matchesSearch
        })
    }, [notes, selectedMenuItem, search])

    const selectMenuItem = (name: string) => {
        setSelectedMenuItem(name)
    }

    const searchCard = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(event.target.value)
    }

    return {
        selectedMenuItem,
        search,
        filteredNotes,
        selectMenuItem,
        searchCard
    }
}