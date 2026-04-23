import type { Note } from "../types/Index";

interface NoteCardProps {
  note: Note;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  editingId: number | null;
}

function NoteCard({ note, onEdit, onDelete, editingId }: NoteCardProps) {
  return (
    <div className={`note-card ${note.id === editingId ? "active" : ""}`}>
      <h3>{note.title}</h3>
     <p>{note.timestamp.toLocaleString()}</p>
      <p>{note.category}</p>
      <p>{note.content.length > 150 ? note.content.slice(0, 150) + "..." : note.content}</p>
      <button onClick={() => onEdit(note.id)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
}
export default NoteCard;
