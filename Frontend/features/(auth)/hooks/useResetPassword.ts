import { useParams } from "next/navigation"
import { useState } from "react"
import { sendNewPassword } from "../services/auth.service"

export function useResetPassword() {
    const [passwordInputValue, setPasswordInputValue] = useState<string>('')
    const [confirmPasswordInputValue, setConfirmPasswordInputValue] = useState<string>('')
    const { token } = useParams()

    const isFormInvalid = () => {
        return (
        passwordInputValue.length < 4 ||
        confirmPasswordInputValue.length < 4 ||
        passwordInputValue !== confirmPasswordInputValue
    )
    }

    return { 
        passwordInputValue, 
        setPasswordInputValue, 
        setConfirmPasswordInputValue,
        sendNewPassword,
        isFormInvalid,
        token
    }
}