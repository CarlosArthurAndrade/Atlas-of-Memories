import { useState } from "react"

export default function useCreateNoteModal() {
    const [intputTitleValue, setTitle] = useState<string>('')
    const [inputTextareaValue, setInputTextareaValue] = useState<string>('')

    const onchangeInput = (value: string, name: string) => {
        if(name == 'Title'){
            setTitle(value)
        } else if (name == 'Textarea'){
            setInputTextareaValue(value)
        }
    }

    return {
        intputTitleValue,
        inputTextareaValue,
        onchangeInput
    }
}