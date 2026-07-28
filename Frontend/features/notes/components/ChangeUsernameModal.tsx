import { ChangeUsernameModalProps } from "@/interfaces/ui/ModalProps";
import { motion } from "framer-motion";
import useChangeUsername from "../hooks/useChangeUsername";
import { Barlow } from "next/font/google";

const barlow = Barlow({
  weight: '400',
  subsets: ['latin']
})

export default function ChangeUsernameModal({ onConfirm, onCancel, token, setUsername, setShowChangeUsernameModal, setShowUserMenu }: ChangeUsernameModalProps) {
    const { inputNewUsernameValue, setNewUsername } = useChangeUsername()
    return(
        <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeIn' }}
      className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      <div className="relative bg-white p-6 rounded-xl shadow-lg z-10 w-[30rem] space-y-2">
        <h2>Altere seu username</h2>
        <div className="w-full flex flex-col space-y-2">
            <p>Novo username: </p>
            <input 
                type="text" 
                name="Title"
                spellCheck={false}
                className={`${barlow.className} w-full py-2 px-4 text-sm border box-border`} 
                value={inputNewUsernameValue} onChange={(event) => setNewUsername(event.target.value)}
            />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm({ username: inputNewUsernameValue, token, setUsername, setShowChangeUsernameModal, setShowUserMenu })}
            className="px-4 py-2 bg-fuchsia text-white rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </motion.div>
    )
}