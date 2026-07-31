import { DeleteNoteModalProps } from "@/interfaces/ui/ModalProps";

export default function DeleteNoteModal({ onConfirm, onCancel, selectedNoteId, setNotes, setSelectedNoteId, setShowDeleteModal, notes }: DeleteNoteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      <div className="relative bg-white p-6 rounded-xl shadow-lg z-10 w-80">
        <h2 className="text-lg font-bold mb-2">
          Tem certeza?
        </h2>
        <p className="text-gray-600 mb-4">
          Essa ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm({
              selectedNoteId,
              setSelectedNoteId,
              setNotes,
              setShowDeleteModal,
              notes
            })}
            className="px-4 py-2 bg-fuchsia text-white rounded"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}