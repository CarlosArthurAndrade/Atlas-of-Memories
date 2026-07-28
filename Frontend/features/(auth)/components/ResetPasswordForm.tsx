import { Prata, Barlow } from "next/font/google"
import { useResetPassword } from "../hooks/useResetPassword"
import useAlert from "../hooks/useAlert"
import { AnimatePresence } from "framer-motion"
import ResponseAlert from "./ResponseAlert"
import { useRouter } from "next/navigation"

const prata = Prata({
        weight: '400',
        subsets: ['latin']
})

const barlow = Barlow({
  weight: '400',
  subsets: ['latin']
})

export function ResetPasswordForm() {
    const { 
        passwordInputValue, 
        setPasswordInputValue,
        setConfirmPasswordInputValue,
        sendNewPassword,
        isFormInvalid,
        token 
    } = useResetPassword()

    const { 
        showAlert, 
        setShowAlert, 
        message, 
        setMessage,
        color,
        setColor
    } = useAlert()

    const router = useRouter()

    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <AnimatePresence>
                {
                    showAlert &&
                    <ResponseAlert message={message} color={color}/>
                }
            </AnimatePresence>
            <div className="w-[90%] md:w-1/2 lg:w-1/2 xl:w-1/3 p-4 grid grid-cols-1 gap-4 border-4">
                <div>
                    <h1 className={`${prata.className} self-start text-xl md:text-2xl bold`}>Defina sua nova senha</h1>
                    <p className={`${barlow.className} text-xs pb-4`}>A senha precisa conter pelo menos 5 caracteres!</p>
                </div>
                <div className="w-full">
                    <p className={`${prata.className}`}>Nova senha</p>
                    <input type="text" className="p-4 w-full bg-light-fuchsia text-black rounded-xl" placeholder="Coloque sua nova senha" onChange={(event) => setPasswordInputValue(event.target.value)}/>
                </div>
                <div className="w-full">
                    <p className={`${prata.className}`}>Redigite a nova senha</p>
                    <input type="text" className="p-4 w-full bg-light-fuchsia text-black rounded-xl" placeholder="Confirme a senha" onChange={(event) => setConfirmPasswordInputValue(event.target.value)}/>
                </div>
                <button 
                    className={
                        `p-2 mt-8 ${isFormInvalid() ? 'bg-gray-500' : 'bg-fuchsia' } 
                        text-white rounded-xl`
                    } 
                    disabled={isFormInvalid() || showAlert } 
                    onClick={() => sendNewPassword({ token, newPassword: passwordInputValue, setColor, setMessage, setShowAlert, router })}>
                    Enviar
                </button>
            </div>
        </div>
    )
}