'use client'
import { Barlow, Prata, Short_Stack } from 'next/font/google'
import { LuPencilLine } from "react-icons/lu"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRegister } from "../hooks/useRegister"
import { useRouter } from 'next/navigation';
import { handleRegister } from '../services/auth.service';
import useAlert from '../hooks/useAlert';
import { AnimatePresence } from 'framer-motion';
import ResponseAlert from './ResponseAlert';

const prata = Prata({
        weight: '400',
        subsets: ['latin']
})

const barlow = Barlow({
  weight: '400',
  subsets: ['latin']
})

const bold_barlow = Barlow({
  weight: '600',
  subsets: ['latin']
})

export default function RegisterUserForm() {
    const { 
        hidePassword,
        setHidePassword, 
        usernameInputValue,
        setUsernameInputValue,
        emailInputValue,
        setEmailInputValue,
        passwordInputValue,
        setPasswordInputValue
    } = useRegister()

    const { 
            showAlert, 
            setShowAlert, 
            message, 
            setMessage,
            color,
            setColor
        } = useAlert()

    const router = useRouter()
    return (
        <div>
            <AnimatePresence>
                {
                    showAlert &&
                    <ResponseAlert message={message} color={color}/>
                }
            </AnimatePresence>
            <div className="w-full h-screen flex items-center justify-center bg-slate-100">
                <div className="flex flex-col items-center w-[85%] sm:w-1/2 lg:w-1/3 space-y-4 lg:border md:p-4">
                    <div className="flex items-start space-x-2 lg:pb-6">
                        <LuPencilLine size={30} color="white" className="bg-fuchsia p-2 rounded-lg"/>
                        <span className={`${prata.className} self-end text-lg md:text-lg lg:text-xl font-medium pb-4`}>Atlas of memories</span>
                    </div>
                    <div className="grid grid-cols-1 w-full">
                        <h1 className={`${prata.className} self-start text-[22px] md:text-[29px] bold`}>Faça seu cadastro</h1>
                        <p className={`${barlow.className} text-xs pb-4`}>Crie seu perfil para salvar suas anotações</p>
                        <div className="grid grid-cols-1 gap-y-2 w-full">
                            <div className="w-full space-y-2">
                                <p className={`${prata.className} text-sm`}>Username</p>
                                <input 
                                    type="email" 
                                    placeholder="Digite seu username" 
                                    onChange={(e) => setUsernameInputValue(e.target.value)} className={`${prata.className} p-3 box-border w-full bg-light-fuchsia rounded-2xl`}/>
                            </div>
                            <div className="w-full space-y-2">
                                <p className={`${prata.className} text-sm`}>Email</p>
                                <input 
                                    type="email" 
                                    placeholder="Digite seu email" 
                                    onChange={(e) => setEmailInputValue(e.target.value)} 
                                    className={`${prata.className} border-none focus:outline-none  p-3 box-border w-full bg-light-fuchsia rounded-2xl`}
                                />
                            </div>
                            <div className="w-full space-y-2">
                                <p className={`${prata.className} text-sm`}>Senha</p>
                                <div className="flex bg-light-fuchsia rounded-2xl">
                                    <input 
                                        type={ hidePassword ? "password" : "text" } 
                                        placeholder="Digite sua senha"
                                        onChange={(e) => setPasswordInputValue(e.target.value)} 
                                        className={`${prata.className} border-none focus:outline-none  p-3 box-border w-full bg-light-fuchsia rounded-2xl`}
                                    />
                                    {
                                        hidePassword ? 
                                        <FaEye className="self-center mr-4" size={20} color="black" onClick={() => setHidePassword(!hidePassword)}/>
                                        :
                                        <FaEyeSlash className="self-center mr-4" size={20} color="black" onClick={() => setHidePassword(!hidePassword)}/>
                                    }
                                </div>
                            </div>
                            <div className="w-full py-2 flex flex-col items-center">
                                <button
                                className={`${bold_barlow.className} text-lg w-full p-2 bg-fuchsia text-white rounded-2xl`}
                                disabled={ showAlert ? true : false }
                                onClick={() => handleRegister(
                                    { 
                                        username: usernameInputValue, 
                                        email: emailInputValue, 
                                        password: passwordInputValue,
                                        router,
                                        setShowAlert, 
                                        setColor, 
                                        setMessage
                                    }
                                )}
                                >
                                    Cadastre-se
                                </button>
                                <a href="/" className={`${barlow.className} mt-4 text-sm self-center hover:underline`}>Volte para o login!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
