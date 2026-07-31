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

    const isFormInvalid = () => {
        if(intputTitleValue.length < 1 || inputTextareaValue.length < 1){
            return true
        }
        return false
    }

    return {
        inputTextareaValue,
        intputTitleValue,
        onchangeInput,
        isFormInvalid
    }
}