'use client'
import { Lato, Prata } from "next/font/google";
import { AiOutlinePlus } from "react-icons/ai";

const prata = Prata({
        weight: '400',
        subsets: ['latin']
    })
    
const lato = Lato({
    weight: '400',
    subsets: ['latin']
})

export default function NewNoteButton({ openCreateNoteModal }: { openCreateNoteModal: () => void }) {
    return(
        <button className={`${prata.className} w-full bold bg-fuchsia px-2 py-3 flex items-center rounded-xl text-white text-sm`} onClick={() => openCreateNoteModal()}>
            <AiOutlinePlus size={20} color="white" className="mx-3"/>
            Nova anotação
        </button>
    )
}