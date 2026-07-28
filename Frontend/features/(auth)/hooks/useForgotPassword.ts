import { useState } from "react";

export function useForgotPassword() {
    const [emailInputValue, setEmailInputValue] = useState<string>('')

    const isFormInvalid = () => {
        return (
            emailInputValue.length < 4
        )
    } 

    return { setEmailInputValue, emailInputValue, isFormInvalid }
}