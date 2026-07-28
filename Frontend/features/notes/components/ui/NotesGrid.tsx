import { Prata } from "next/font/google"
import { NotesGridPropTypes } from "../../interfaces/notes.interfaces"
import { changeFavoriteStatus } from "../../services/notes.service"
import NoData from "../NoData"
import NoteCard from "./NoteCard"
import SearchInput from "./SearchInput"
import { IoMenu, IoClose } from "react-icons/io5";

const prata = Prata({
        weight: '400',
        subsets: ['latin']
})

export default function NotesGrid(
    { notes, firstColumnNotes, secondColumnNotes, selectedMenuItem, openEditModal, openDeleteModal, token, searchCard, openSidebar }: NotesGridPropTypes
) {
    return(
        <div className="w-full h-full box-border px-5 py-10 flex flex-col space-y-5">
            <div className="w-full flex items-center">
                <IoMenu onClick={() => openSidebar(true)} size={25} className="lg:hidden"/>
                <h2 className={`${prata.className} text-xl font-medium absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0`}>{selectedMenuItem}</h2>
            </div>
            <SearchInput
                placeholder="Buscar"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => searchCard(event)}
            />
            <div className="block lg:hidden pb-4 lg:pb-0">
                {
                    notes.length == 0 ? <NoData /> :
                    <div className="flex flex-col space-y-2 w-full">
                        {notes.map((item, index) => (
                            <NoteCard
                                key={item.title}
                                title={item.title}
                                messageText={item.messageText}
                                color={item.color}
                                writingDate={item.writingDate}
                                id={item.id}
                                index={index}
                                favorite={item.favorite === 0 ? false : true}
                                openDeleteModal={openDeleteModal}
                                openEditModal={openEditModal}
                                onclickFavoriteButton={async () => { changeFavoriteStatus({id: item.id, token}) }}
                            />
                        ))}
                    </div>
                }
            </div>
            <div className="hidden lg:block">
                {
                notes.length == 0 ? <NoData /> : 
                <div className="w-full grid grid-cols-2 gap-2">
                    <div className="flex flex-col space-y-2 w-full">
                        {firstColumnNotes.map((item, index) => (
                            <NoteCard
                                key={item.title}
                                title={item.title}
                                messageText={item.messageText}
                                color={item.color}
                                writingDate={item.writingDate}
                                id={item.id}
                                index={index}
                                favorite={item.favorite === 0 ? false : true}
                                openDeleteModal={openDeleteModal}
                                openEditModal={openEditModal}
                                onclickFavoriteButton={async () => { changeFavoriteStatus({id: item.id, token}) }}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col space-y-2 w-full">
                        {secondColumnNotes.map((item, index) => (
                            <NoteCard
                                key={item.title}
                                title={item.title}
                                messageText={item.messageText}
                                color={item.color}
                                writingDate={item.writingDate}
                                id={item.id}
                                index={index}
                                favorite={item.favorite === 0 ? false : true}
                                openDeleteModal={openDeleteModal}
                                openEditModal={openEditModal}
                                onclickFavoriteButton={async () => { changeFavoriteStatus({id: item.id, token}) }}
                            />
                        ))}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}