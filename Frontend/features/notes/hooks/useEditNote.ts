import { useState } from "react"
import { EditNoteModalDataParams } from "../interfaces/notes.interfaces"

export function useEditNote({ title, text }: EditNoteModalDataParams) {
    const [intputTitleValue, setTitle] = useState<string>(title)
    const [inputTextareaValue, setInputTextareaValue] = useState<string>(text)

    const onchangeInput = (value: string, name: string) => {
        if(name == 'Title'){
            setTitle(value)
        } else if (name == 'Textarea'){
            setInputTextareaValue(value)
        }
    }

    return {
        inputTextareaValue,
        intputTitleValue,
        onchangeInput
    }
}