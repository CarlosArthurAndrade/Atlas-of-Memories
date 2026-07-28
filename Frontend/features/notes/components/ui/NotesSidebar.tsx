import { LuAlignLeft, LuPencilLine, LuStar } from "react-icons/lu";
import NewNoteButton from "./NewNoteButton";
import { MenuTagItem } from "@/interfaces/ui/TagItemsProps";
import { SidbarPropTypes } from "../../interfaces/notes.interfaces";
import { Prata } from "next/font/google";
import UserMenu from "./UserMenu";

const tagFilters: MenuTagItem[] = [
    {
        name: "Todas as notas",
        icon: <LuAlignLeft size={20} className="mx-3"/>
    },
    {
        name: "Favoritas",
        icon: <LuStar size={20} className="mx-3"/>
    }
]

const prata = Prata({
        weight: '400',
        subsets: ['latin']
})

export default function NotesSidebar(
    { selectMenuItem, username, selectedMenuItem, openCreateModal, openChangeUsername, showUserMenu, logout, setShowUserMenu
    }: SidbarPropTypes) {
    return(
        <div className="hidden lg:flex w-1/5 lg:w-1/3 xl:w-1/4 h-full flex-col justify-between bg-light-fuchsia box-border px-5 py-10">
                <div className="w-full flex flex-col items-start space-y-8">
                    <div className="flex items-start space-x-2">
                        <LuPencilLine size={30} color="white" className="bg-fuchsia p-2 rounded-lg"/>
                        <span className={`${prata.className} self-end text-xl font-medium`}>Atlas of memories</span>
                    </div>
                    <NewNoteButton openCreateNoteModal={openCreateModal}/>
                    <div className="flex flex-col w-full items-start">
                        {
                            tagFilters.map((tag, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectMenuItem(tag.name)}
                                    className={
                                        `${selectedMenuItem == tag.name ? 'bg-selected-menu-button font-medium text-black' : 'bg-light-fuchsia text-light-fuchsia'} 
                                        ${prata.className} 
                                        w-full bg-fuchsia px-2 py-3 flex items-center rounded-xl text-sm bold`
                                    }>
                                    {tag.icon}
                                    {tag.name}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <UserMenu
                    logout={logout}
                    username={username}
                    setShowUserMenu={setShowUserMenu}
                    showUserMenu={showUserMenu}
                    openChangeUsername={openChangeUsername}
                />
            </div>
    )
}