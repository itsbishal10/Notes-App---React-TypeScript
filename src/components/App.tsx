import { useEffect, useState } from "react";
import type { Note } from "../types/Index";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function App() {
  const [notes, setNotes] = useState<Note[]>(()=>{
    const storedNotes= localStorage.getItem("notes");
    if(!storedNotes) return [];

    const parsedNotes = JSON.parse(storedNotes);

    return parsedNotes.map((note: Note)=>({
      ...note,
      timestamp: new Date(note.timestamp)
    }));
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDelete = (id: number): void => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const addNote = (): void => {
    if (editingId !== null) {
const noteToUpdate = notes.find(n => n.id === editingId);
if (!noteToUpdate) return;

const updatedNote = {
  ...noteToUpdate,
  title,
  content,
  category
};

const remainingNotes = notes.filter(n => n.id !== editingId);

setNotes([updatedNote, ...remainingNotes]);
setEditingId(null);
    } else {
      const newNote: Note = {
        id: Date.now(),
        title,
        content,
        category,
        timestamp: new Date(),
      };
      setNotes([ newNote, ...notes]);
    }

    // reset form after create or update
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleEdit = (id: number): void => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    setEditingId(id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const handleCancelEdit = (): void => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <div>
      <h1>Note App</h1>

      <NoteForm
        title={title}
        content={content}
        category={category}
        setTitle={setTitle}
        setContent={setContent}
        setCategory={setCategory}
        onSubmit={addNote}
        editingId={editingId}
        onCancel={handleCancelEdit}
      />

      <NoteList
        notes={notes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        editingId={editingId}
      />
    </div>
  );
}

export default App;