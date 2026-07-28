import { useState } from "react"

export function useRegister() {
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [usernameInputValue, setUsernameInputValue] = useState<string>('')
    const [emailInputValue, setEmailInputValue] = useState<string>('')
    const [passwordInputValue, setPasswordInputValue] = useState<string>('')

    return { 
        hidePassword,
        setHidePassword, 
        usernameInputValue,
        setUsernameInputValue,
        emailInputValue,
        setEmailInputValue,
        passwordInputValue,
        setPasswordInputValue
    }
}