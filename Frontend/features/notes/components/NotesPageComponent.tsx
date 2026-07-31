import ChangeUsernameModal from "./ChangeUsernameModal"
import CreateNoteModal from "./CreateNoteModal"
import DeleteNoteModal from "./DeleteNoteModal"
import EditNoteModal from "./EditNoteModal"
import useNotes from "../hooks/useNotes"
import { deleteNote, updateNote, createNote, changeUsername, changeFavoriteStatus } from "../services/notes.service"
import NotesGrid from "./ui/NotesGrid"
import NotesSidebar from "./ui/NotesSidebar"
import MobileSidebar from "./ui/MobileSidebar"
import { AnimatePresence } from "framer-motion"

export default function NotesPageComponent() {
    const {
        notes,
        setNotes,
        username,
        setUsername,

        token,
        logout,

        selectedMenuItem,
        search,
        filteredNotes,
        selectMenuItem,
        searchCard,

        showUserMenu,
        setShowUserMenu,

        showChangeUsernameModal,
        showMobileSidebar,
        openChangeUsername,
        cancelChangeUsername,
        setShowUsernameModal,
        setShowMobileSidebar,
        divRef,
        ...modals
    } = useNotes()
    
    const firstColumnNotes = filteredNotes.filter((_elemento_, index) => index % 2 == 0)
    const secondColumnNotes = filteredNotes.filter((_elemento, index) => index % 2 !== 0)
    
    return (
        <div className="flex flex-col lg:flex-row h-screen">
            { modals.showDeleteModal && 
                <DeleteNoteModal 
                    onCancel={modals.cancelDelete} 
                    onConfirm={deleteNote}
                    setNotes={setNotes}
                    setSelectedNoteId={modals.setSelectedNoteId}
                    selectedNoteId={modals.selectedNoteId!}
                    setShowDeleteModal={modals.setShowDeleteModal}
                    notes={filteredNotes}
                />
            }
            { modals.showEditModal && 
                <EditNoteModal 
                    onCancel={modals.cancelEdit} 
                    onConfirm={updateNote} 
                    token={token}
                    setShowEditModal={modals.setShowEditModal}
                    setFiltredNotes={setNotes}
                    title={modals.selectedNoteTitle} 
                    text={modals.selectedNoteText}
                    noteId={modals.selectedNoteId!}
                />
            }
            { modals.showCreateNoteModal && 
                <CreateNoteModal 
                    onCancel={modals.cancelCreate}
                    onConfirm={createNote}
                    setNotes={setNotes}
                    setShowCreateNoteModal={modals.setShowCreateNoteModal}
                    token={token}
                />
            }
            { showChangeUsernameModal && 
                <ChangeUsernameModal
                setShowUserMenu={setShowUserMenu}
                setShowChangeUsernameModal={setShowUsernameModal}
                onCancel={cancelChangeUsername} 
                onConfirm={changeUsername}
                setUsername={setUsername}
                token={token}
                />
            }
            <AnimatePresence>
                { showMobileSidebar && 
                    <MobileSidebar
                        selectMenuItem={selectMenuItem}
                        selectedMenuItem={selectedMenuItem}
                        openChangeUsername={openChangeUsername}
                        openCreateModal={modals.openCreateModal}
                        setShowUserMenu={setShowUserMenu}
                        showUserMenu={showUserMenu}
                        setShowMobileSidebar={setShowMobileSidebar}
                        logout={logout}
                        username={username!}
                        divRef={divRef}
                    />
                }
            </AnimatePresence>
            <NotesSidebar
                selectMenuItem={selectMenuItem}
                selectedMenuItem={selectedMenuItem}
                openChangeUsername={openChangeUsername}
                openCreateModal={modals.openCreateModal}
                setShowUserMenu={setShowUserMenu}
                showUserMenu={showUserMenu}
                logout={logout}
                username={username!}
            />
            <NotesGrid
                searchCard={searchCard}
                token={token}
                firstColumnNotes={firstColumnNotes}
                secondColumnNotes={secondColumnNotes}
                selectedMenuItem={selectedMenuItem}
                openDeleteModal={modals.openDeleteModal}
                openEditModal={modals.openEditModal}
                openSidebar={setShowMobileSidebar}
                notes={filteredNotes}
            />
        </div>
    )
}