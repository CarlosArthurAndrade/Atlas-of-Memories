import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export interface User {
    id: number
    username: string
    email: string
    password: string
}

export interface ForgotPasswordData {
    email: string,
    setShowAlert: (boolean: boolean) => void
    setMessage: (message: string) => void,
    setColor: (color: string) => void
}

export interface LoginDataTypes {
    email: string,
    password: string,
    router: AppRouterInstance,
    setShowAlert: (boolean: boolean) => void,
    setMessage: (message: string) => void,
    setColor: (color: string) => void
}

export interface RegisterDataTypes {
    username: string,
    email: string,
    password: string,
    router: AppRouterInstance,
    setShowAlert: (boolean: boolean) => void,
    setMessage: (message: string) => void,
    setColor: (color: string) => void
}

export interface NewPasswordDataTypes {
    token: string | string[],
    newPassword: string,
    router: AppRouterInstance,
    setShowAlert: (boolean: boolean) => void,
    setMessage: (message: string) => void,
    setColor: (color: string) => void
}

export interface SendAlertMessagePropTypes {
    message: string,
    color: string,
    setMessage: (message: string) => void,
    setColor: (color: string) => void,
    setShowAlert: (boolean: boolean) => void,
}