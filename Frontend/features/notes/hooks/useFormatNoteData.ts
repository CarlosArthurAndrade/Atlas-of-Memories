import { useState } from "react";
import { UseNoteParams } from "../interfaces/notes.interfaces";

export default function useFormateNoteData({ favorite, writingDate }: UseNoteParams) {
    const [favoriteState, setFavoriteState] = useState<boolean>(favorite)
    const [dia, mes, ano] = writingDate.split("/").map(Number);
    const data = new Date(ano, mes - 1, dia);

    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
    }).format(data);

    return {
        favoriteState, 
        setFavoriteState, 
        dataFormatada
    }
}