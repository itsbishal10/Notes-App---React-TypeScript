import type { Note } from "../types/Index";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  editingId: number | null;
}

function NoteList({ notes, onEdit, onDelete, editingId }: NoteListProps) {
if (notes.length === 0) {
  return <p className="empty-state">No notes yet. Create one to get started!</p>;
}
  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          editingId={editingId}
        />
      ))}
    </div>
  );
}

export default NoteList;
