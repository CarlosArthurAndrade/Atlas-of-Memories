import { Prata, Lato } from "next/font/google"
import { useForgotPassword } from "../hooks/useForgotPassword"
import { sendResetPasswordEmail } from "../services/auth.service"
import validateEmail from "../services/utils/validateEmail"
import useAlert from "../hooks/useAlert"
import { AnimatePresence } from "framer-motion"
import ResponseAlert from "./ResponseAlert"

const prata = Prata({
        weight: '400',
        subsets: ['latin']
})
    
const lato = Lato({
    weight: '400',
    subsets: ['latin']
})

export default function ForgotPasswordForm() {
    const { setEmailInputValue, emailInputValue, isFormInvalid } = useForgotPassword()

    const { 
        showAlert, 
        setShowAlert, 
        message, 
        setMessage,
        color,
        setColor
    } = useAlert()

    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <AnimatePresence>
                {
                    showAlert &&
                    <ResponseAlert message={message} color={color}/>
                }
            </AnimatePresence>
            <div className="w-[90%] md:w-1/2 lg:w-1/2 xl:w-1/3 p-4 grid grid-cols-1 gap-2 border-4">
                <div>
                    <h1 className={`${prata.className} self-start text-xl md:text-2xl bold`}>Esqueceu sua senha?</h1>
                    <p className={`${lato.className} text-xs pb-4`}>Redfina a senha em duas etapas.</p>
                </div>
                <p>Email</p>
                <input type="email" 
                    className="p-4 bg-light-fuchsia rounded-xl" 
                    placeholder="Coloque seu email" 
                    onChange={(event) => setEmailInputValue(event.target.value)}
                />
                <button 
                    className={`${isFormInvalid() ? 'bg-gray-500' : 'bg-fuchsia' } p-2 text-white rounded-xl`}
                    disabled={ isFormInvalid() || showAlert}
                    onClick={() => sendResetPasswordEmail({ email: emailInputValue, setColor, setMessage, setShowAlert })}
                >
                    Enviar
                </button>
            </div>
        </div>
    )
}