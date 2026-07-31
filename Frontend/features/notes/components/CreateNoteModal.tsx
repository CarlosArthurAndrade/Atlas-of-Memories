import { CreateModalProps } from "@/interfaces/ui/ModalProps"
import { motion } from "framer-motion"
import useCreateNoteModal from "../hooks/useCreateNote"
import { Barlow } from "next/font/google"

const barlow = Barlow({
  weight: '400',
  subsets: ['latin']
})

export default function CreateNoteModal({ onConfirm, onCancel, token, setNotes, setShowCreateNoteModal }: CreateModalProps) {
    const {
        intputTitleValue,
        inputTextareaValue,
        onchangeInput,
        isFormInvalid
    } = useCreateNoteModal()

    return (
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
        <h2>Crie uma nova anotação</h2>
        <div className="w-full flex flex-col space-y-2">
            <p>Titulo<span className="text-red-500 text-lg">*</span>: </p>
            <input 
                type="text" 
                name="Title"
                spellCheck={false}
                className={`${barlow.className} w-full py-2 px-4 text-sm border box-border`} 
                value={intputTitleValue} onChange={(event) => onchangeInput(event.target.value, event.target.name)}
            />
        </div>
        <div className="w-full flex flex-col space-y-2">
            <p>Texto<span className="text-red-500 text-lg">*</span>: </p>
            <textarea 
                className={`${barlow.className} w-full py-2 px-4 text-sm border box-border`}
                name="Textarea"
                spellCheck={false}
                value={inputTextareaValue} onChange={(event) => onchangeInput(event.target.value, event.target.name)}
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
            disabled={isFormInvalid()}
            onClick={() => onConfirm(
              {
                title: intputTitleValue,
                messageText: inputTextareaValue,
                token,
                setNotes,
                setShowCreateNoteModal
              }
            )}
            className={`px-4 py-2 ${ isFormInvalid() ? 'bg-gray-500' : 'bg-fuchsia' } text-white rounded`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </motion.div>
  )
}