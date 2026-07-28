import { deleteData, postData, updateData } from "@/hooks/fetchData"
import { User } from "@/interfaces/http/DataTypes"
import { ForgotPasswordData, LoginDataTypes, NewPasswordDataTypes, RegisterDataTypes } from "../interfaces/auth.interfaces"
import { tokenResponse } from "@/interfaces/http/Response"
import validateEmail from "./utils/validateEmail"
import sendAlertMessage from "./utils/sendAlertMessage"

export async function handleLogin(data: LoginDataTypes) {
    try{
        if(!validateEmail(data.email)) {
            await sendAlertMessage({ 
                message: 'Email inválido', 
                color: 'red', 
                setColor: data.setColor, 
                setMessage: data.setMessage, 
                setShowAlert: data.setShowAlert,
            })
            return
        }
        const response = await postData<{ token: string } | undefined>('http://localhost:3001/Users/login', data)
        if (response?.data?.token) {
            localStorage.setItem("accessToken", response?.data.token)
            data.router.push('/notes')
        } else {
            await sendAlertMessage({ 
                message: 'Email ou senha incorretos', 
                color: 'red', 
                setColor: data.setColor, 
                setMessage: data.setMessage, 
                setShowAlert: data.setShowAlert,
            })
        }
    } catch(error){
        console.error(error)
    }
}

export async function handleRegister(data: RegisterDataTypes) {
    try{
        if(!validateEmail(data.email)) {
            await sendAlertMessage({ 
                message: 'Email inválido', 
                color: 'red', 
                setColor: data.setColor, 
                setMessage: data.setMessage, 
                setShowAlert: data.setShowAlert 
            })
            return
        }
        const response = await postData<User>('http://localhost:3001/Users/sing-up', data)
        if (response?.statusCode === 200) {
            await sendAlertMessage({ 
                message: 'Usuário cadastrado com sucesso', 
                color: 'green', 
                setColor: data.setColor, 
                setMessage: data.setMessage, 
                setShowAlert: data.setShowAlert,
            })
            return data.router.push('/')
        }
    } catch(error){
        console.error(error)
    }
}

export async function sendResetPasswordEmail(data: ForgotPasswordData) {
    try {
        if(!validateEmail(data.email)) {
            await sendAlertMessage({ 
                message: 'Email inválido', 
                color: 'red', 
                setColor: data.setColor, 
                setMessage: data.setMessage, 
                setShowAlert: data.setShowAlert 
            })
            return
        }
        const userResponse = await postData<User>('http://localhost:3001/Users/select-by-email', { email: data.email })
        if(userResponse?.data?.id){
            await postData('http://localhost:3001/Users/save-token', 
                {
                    userId: userResponse.data.id, 
                    emailInputValue: data.email,
                })
            await sendAlertMessage({ 
                message: 'Se o email existir o link será enviado', 
                color: 'green', 
                setColor: data.setColor, 
                setMessage: data.setMessage, 
                setShowAlert: data.setShowAlert 
            })
        } else {
            await sendAlertMessage({ 
                message: 'Se o email existir o link será enviado', 
                color: 'green', 
                setColor: data.setColor, 
                setMessage: data.setMessage, 
                setShowAlert: data.setShowAlert 
            })
        }
    } catch(err) {
        console.error(err)
    }
}

export async function sendNewPassword({ token, newPassword, router, setColor, setMessage, setShowAlert }: NewPasswordDataTypes) {
    try {
        const tokenHashResponse = await postData<tokenResponse>('http://localhost:3001/Users/find-token', { token })
        if (!tokenHashResponse?.data){
            await sendAlertMessage({ 
                message: 'Token inválido', 
                color: 'red', 
                setColor: setColor, 
                setMessage: setMessage, 
                setShowAlert: setShowAlert 
            })
        }

        if (new Date(tokenHashResponse?.data?.expiresAt!) < new Date()) {
            await sendAlertMessage({ 
                message: 'Token expirado', 
                color: 'red', 
                setColor: setColor, 
                setMessage: setMessage, 
                setShowAlert: setShowAlert 
            })
        }
        if (tokenHashResponse?.data?.id) {
            await updateData('http://localhost:3001/Users/reset-password', { newPassword ,userId: tokenHashResponse.data.userId })
            await deleteData('http://localhost:3001/Users/delete-token', { id: tokenHashResponse.data.id })
            await sendAlertMessage({ 
                message: 'Senha alterada com sucesso', 
                color: 'green', 
                setColor: setColor, 
                setMessage: setMessage, 
                setShowAlert: setShowAlert,
            })
            return router.push('/')
        }
    } catch(err) {
        console.error(err)
    }
}