import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseApiURL } from "./App";
import CreateArea from "./CreateArea";
import DailyNotesView from "./DailyNotesView";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isValid, parseISO } from 'date-fns';

function Notebook({ user }) {
    const [userNotes, setUserNotes] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchUserNotes();
    }, []);

    const fetchUserNotes = async () => {
        try {
            const { data } = await axios.get(`${baseApiURL}/api/shownotes`, { withCredentials: true });
            if (data && data.data) {
                const notesWithDates = data.data.map(note => ({
                    ...note,
                    created_at: note.created_at ? parseISO(note.created_at) : null
                }));
                setUserNotes(notesWithDates);
            }
        } catch (err) {
            console.error("Błąd pobierania notatek:", err);
        }
    };

    const addNote = async (newNote) => {
        try {
            await axios.post(`${baseApiURL}/api/postnote`, {
                title: newNote.title,
                content: newNote.content,
            }, { withCredentials: true });
            fetchUserNotes();
        } catch (error) {
            console.error("Błąd podczas dodawania notatki:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${baseApiURL}/api/delete`, { data: { id } });
            fetchUserNotes();
        } catch (error) {
            console.error("Błąd podczas usuwania notatki:", error);
        }
    };

    const editNote = async (editedData) => {
        try {
            await axios.patch(`${baseApiURL}/api/edit`, { data: editedData });
            fetchUserNotes();
        } catch (error) {
            console.error("Błąd podczas edycji notatki:", error);
        }
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
    };

    const renderCalendarGrid = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
        const firstDayOfWeek = getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1;
        
        let calendarDays = Array.from({ length: firstDayOfWeek }, (_, i) => <div key={`empty-${i}`} className="day-cell other-month"></div>);

        days.forEach(day => {
            const notesForDay = userNotes.filter(note => note.created_at && isValid(note.created_at) && format(note.created_at, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
            calendarDays.push(
                <div key={day.toString()} className="day-cell" onClick={() => handleDayClick(day)}>
                    <div className="day-number"><div>{format(day, 'd')}</div></div>
                    <div className="notes-previews-container">
                        {notesForDay.map(note => (
                            <div key={note.noteid} className="note-preview">
                                <h3>{note.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            );
        });

        return calendarDays;
    };
    
    if (selectedDate) {
        return (
            <DailyNotesView
                date={selectedDate}
                allNotes={userNotes}
                onBack={() => setSelectedDate(null)}
                onEdit={editNote}
                onDelete={deleteNote}
            />
        );
    }

    return (
        <div className="notebook-container">
            <div className="calendar-header">
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <div className="btn-group calendar-nav">
                    <button className="btn btn-outline-primary" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>Poprzedni</button>
                    <button className="btn btn-outline-primary" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>Następny</button>
                </div>
            </div>
            
            <CreateArea onAdd={addNote} />

            <div className="calendar-grid-header">
                <div className="day-name">Pon</div>
                <div className="day-name">Wt</div>
                <div className="day-name">Śr</div>
                <div className="day-name">Czw</div>
                <div className="day-name">Pt</div>
                <div className="day-name">Sob</div>
                <div className="day-name">Ndz</div>
            </div>
            <div className="calendar-grid">
                {renderCalendarGrid()}
            </div>
        </div>
    );
}

export default Notebook;
