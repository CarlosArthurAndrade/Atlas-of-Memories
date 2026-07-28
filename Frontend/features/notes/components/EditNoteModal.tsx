import { EditModalProps } from "@/interfaces/ui/ModalProps";
import { useEditNote } from "../hooks/useEditNote";
import { Prata, Lato } from "next/font/google";

const prata = Prata({
        weight: '400',
        subsets: ['latin']
    })
    
const lato = Lato({
    weight: '400',
    subsets: ['latin']
})

export default function EditNoteModal({ onConfirm, onCancel, title, text, noteId, setShowEditModal, setFiltredNotes, token }: EditModalProps) {

    const {
        inputTextareaValue,
        intputTitleValue,
        onchangeInput
    } = useEditNote({ title, text })

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white p-6 rounded-xl shadow-lg z-10 w-[30rem] space-y-2">
        <h2 className={`${prata.className}`}>Edite sua anotação</h2>
        <div className="w-full flex flex-col space-y-2">
            <p className={`${prata.className}`}>Titulo: </p>
            <input 
                type="text" 
                name="Title"
                spellCheck={false}
                className={`${lato.className} w-full py-2 px-4 text-sm border box-border`}
                value={intputTitleValue} onChange={(event) => onchangeInput(event.target.value, event.target.name)}
            />
        </div>
        <div className="w-full flex flex-col space-y-2">
            <p className={`${prata.className}`}>Texto: </p>
            <textarea 
                className={`${lato.className} w-full py-2 px-4 text-sm border box-border`}
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
            onClick={() => onConfirm(
              {
                title: intputTitleValue,
                text: inputTextareaValue,
                token,
                setFiltredNotes,
                setShowEditNoteModal: setShowEditModal, 
                noteId
              }
            )}
            className="px-4 py-2 bg-fuchsia text-white rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}