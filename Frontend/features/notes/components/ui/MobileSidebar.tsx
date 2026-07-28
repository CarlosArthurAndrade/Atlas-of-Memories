import { MenuTagItem } from "@/interfaces/ui/TagItemsProps";
import { Prata } from "next/font/google";
import { IoClose } from "react-icons/io5";
import { LuAlignLeft, LuPencilLine, LuStar } from "react-icons/lu";
import { MobileSidebarPropTypes } from "../../interfaces/notes.interfaces";
import NewNoteButton from "./NewNoteButton";
import UserMenu from "./UserMenu";
import { motion } from "framer-motion";

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

export default function MobileSidebar(
    { closeMenu, selectMenuItem, username, selectedMenuItem, openCreateModal, openChangeUsername, showUserMenu, logout, setShowUserMenu }: MobileSidebarPropTypes) {
    return(
        <motion.div
        initial={{ opacity: 0, x: -80}}
        animate={{ opacity: 1, x: 0}}
        exit={{ opacity: 0, x: -80}}
        className="w-[85%] md:w-2/5 bg-light-fuchsia box-border fixed inset-y-0 z-50 lg:hidden py-6 px-1 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
                <div className="flex items-start space-x-2 p-4">
                    <div>
                        <IoClose onClick={() => closeMenu(false)} size={25} className="lg:hidden"/>
                    </div>
                    <div className="flex space-x-2">
                        <LuPencilLine size={30} color="white" className="bg-fuchsia p-2 rounded-lg"/>
                    <span className={`${prata.className} self-end lg:text-xl text-lg font-medium`}>Atlas of memories</span>
                    </div>
                </div>
                <div className="w-full flex flex-col box-border px-5 space-y-8">
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
            </div>
            <div className="px-5">
                <UserMenu
                logout={logout}
                username={username}
                setShowUserMenu={setShowUserMenu}
                showUserMenu={showUserMenu}
                openChangeUsername={openChangeUsername}
            />
            </div>
        </motion.div>
    )
}