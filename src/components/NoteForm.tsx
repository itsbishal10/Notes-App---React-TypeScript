import { useState } from "react";

interface NoteFormProps {
  title: string;
  content: string;
  category: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setCategory: (value: string) => void;
  onSubmit: () => void;
  editingId: number | null;
  onCancel: () => void;
}

function NoteForm({
  title,
  content,
  category,
  setTitle,
  setContent,
  setCategory,
  onSubmit,
  editingId,
  onCancel,
}: NoteFormProps) {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") {
      setError("Title is required");
      return;
    }
    setError("");
    onSubmit();
  };

  const handleCancel = () => {
  setError("");
  onCancel();
};

  return (
    <div className="form-container">
      <label>Title</label>
      <input
        className="input"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <p className="error">{error}</p>}

      <label>Category</label>
      <input
        className="input"
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <label>Content</label>
      <textarea
        className="input"
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="btn-primary" onClick={handleSubmit}>
        {editingId !== null ? "Update Note" : "Create Note"}
      </button>
      
      {editingId !== null && (
        <button
          className="btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

export default NoteForm;
