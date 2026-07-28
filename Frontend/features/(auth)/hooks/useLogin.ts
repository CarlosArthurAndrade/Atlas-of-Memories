import { z } from "zod"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const loginFormSchema = z.object({
    email: z.string(),
    password: z.string()
})

type LoginFormSchema = z.infer<typeof loginFormSchema>

export function useLogin() {
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [emailInputValue, setEmailInputValue] = useState<string>('')
    const [passwordInputValue, setPasswordInputValue] = useState<string>('')

    const router = useRouter()
    useEffect(() => {
    const userToken = localStorage.getItem("accessToken")
    if(userToken){
        router.push('/notes')
    }
    }, [router])

    return {
        setEmailInputValue, 
        setPasswordInputValue,
        setHidePassword,
        emailInputValue,
        passwordInputValue,
        hidePassword
    }
}