import React, { useState } from 'react';
import { format } from 'date-fns';
import Note from './Note';
import Button from 'react-bootstrap/Button';
import Chatbot from './Chatbot';

function DailyNotesView({ date, allNotes, onBack, onEdit, onDelete }) {
    
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [noteForChat, setNoteForChat] = useState(null);

    const handleOpenChat = (note) => {
        if (note && note.content) {
            setNoteForChat(note);
            setIsChatOpen(true);
        } else {
            console.error("Błąd: Nie można otworzyć czatu dla nieprawidłowej notatki.", note);
            alert("Nie można otworzyć asystenta - błąd danych notatki.");
        }
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
        setNoteForChat(null);
    };

    const notesForDay = allNotes.filter(note => 
        note.created_at && format(new Date(note.created_at), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        
    );
    
    return (
        <> 
            <div className="daily-notes-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Notatki z dnia: {format(date, 'dd MMMM yyyy')}</h2>
                    <Button variant="outline-secondary" onClick={onBack}>
                        &larr; Wróć do kalendarza
                    </Button>
                </div>
                <div className="notes-list">
                    {notesForDay.length > 0 ? (
                        notesForDay.map(note => (
                            <Note 
                                key={note.noteid}
                                note={note}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onOpenChat={handleOpenChat}
                            />
                        ))
                    ) : (
                        <p>Brak notatek tego dnia.</p>
                    )}
                </div>
            </div>

            {isChatOpen && noteForChat && (
                <Chatbot note={noteForChat} onClose={handleCloseChat} />
            )}
        </>
    );
}

export default DailyNotesView;