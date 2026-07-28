import { NoteResponseData } from "@/interfaces/http/DataTypes";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GoPencil, GoTrash } from "react-icons/go";
import { Lato, Prata } from "next/font/google"
import useFormateNoteData from "../../hooks/useFormatNoteData";

const fadeInVariants = {
    initial: {
        opacity: 0,
        y: -40
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index
        }
    })
}

const prata = Prata({
    weight: '400',
    subsets: ['latin']
})

const lato = Lato({
    weight: '400',
    subsets: ['latin']
})

export default function NoteCard(
    {
        id,
        title,
        writingDate,
        messageText, 
        index, 
        favorite,
        openDeleteModal,
        openEditModal,
        onclickFavoriteButton,
    }: NoteResponseData) {
    const { favoriteState, setFavoriteState, dataFormatada } = useFormateNoteData({ favorite, writingDate })
    return(
        <AnimatePresence>
            <motion.div
                initial={fadeInVariants.initial}
                animate={fadeInVariants.animate(index)}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: 'easeIn' }}
                viewport={{
                    once: true
                }}
                custom={index}
                >
                <div className="w-full shadow-xl border flex flex-col text-wrap rounded-2xl break-words bg-note">
                    <div className="w-full flex justify-between box-border p-3">
                        <p className={`${prata.className} bold text-sm md:text-lg`}>{dataFormatada}</p>
                        <div className="flex space-x-1">
                            <button onClick={() => {
                                onclickFavoriteButton(id!)
                                setFavoriteState(!favoriteState)
                            }}>
                                {favoriteState ? <FaStar size={18} className="color-favorite-icon"/> : <FaRegStar size={18}/>}
                            </button>
                            <button onClick={() => openEditModal(id!)}>
                                <GoPencil size={18}/>
                            </button>
                            <button onClick={() => openDeleteModal(id!)}>
                                <GoTrash size={18}/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 px-3 pb-3">
                        <h2 className={`${prata.className} bold text-sm lg:text-lg`}>{title}</h2>
                        <p className={`text-sm ${lato.className} text-xs lg:text-md`}>{messageText}</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}