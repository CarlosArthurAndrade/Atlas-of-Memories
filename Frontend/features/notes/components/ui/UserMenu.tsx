import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { SidbarPropTypes, UserMenuPropTypes } from "../../interfaces/notes.interfaces";

export default function UserMenu({ showUserMenu, username, openChangeUsername, logout, setShowUserMenu }: UserMenuPropTypes) {
    return(
        <AnimatePresence mode="wait">
            <motion.div
                className="flex flex-col items-start space-y-2" 
                exit={{ opacity: 0 }}
            >
                <AnimatePresence>
                    {
                        showUserMenu && <motion.div 
                            className="w-full bg-note rounded-md"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <button className="text-xs box-border p-2 w-full text-start" onClick={openChangeUsername}>Mudar Username</button>
                        <button className="text-xs box-border p-2 w-full text-start" onClick={logout}>Sair</button>
                    </motion.div>
                    }
                </AnimatePresence>
                <div className="w-full bg-selected-menu-button flex justify-between box-border p-2 rounded-md" onClick={() => setShowUserMenu(!showUserMenu)}>
                    <p className="text-sm nowrap">{username}</p>
                    { showUserMenu ? 
                        <IoIosArrowUp size={15} color="black" className="self-center"/> 
                        : 
                        <IoIosArrowDown size={15} color="black" className="self-center"/>
                    }
                </div>
            </motion.div>
        </AnimatePresence>
    )
}