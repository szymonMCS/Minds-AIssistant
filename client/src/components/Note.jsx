import React, { useState } from "react";
import NoteEditorDialog from "./NoteEditorDialog";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaTrash, FaEdit, FaRobot } from 'react-icons/fa';

function Note({ note, onDelete, onEdit, onOpenChat }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedNote) => {
    onEdit(updatedNote);
    setIsEditing(false);
  };

  if (!note) {
    return null;
  }

  return (
    <>
      <Card className="mb-3 note-card">
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text className="note-card-content">
            {note.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted d-flex justify-content-end gap-2">
            <Button variant="outline-primary" size="sm" onClick={() => onOpenChat(note)} title="Porozmawiaj z AI">
                <FaRobot />
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setIsEditing(true)} title="Edytuj">
                <FaEdit />
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(note.noteid)} title="Usuń">
                <FaTrash />
            </Button>
        </Card.Footer>
      </Card>

      <NoteEditorDialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        note={note}
        onSave={handleSave}
      />
    </>
  );
}

export default Note;