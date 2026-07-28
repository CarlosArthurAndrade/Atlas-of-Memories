import { useState } from "react";

export default function useAlert() {
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [color, setColor] = useState<string>('')

    return {
        showAlert, setShowAlert, message, setMessage, color, setColor
    }
}