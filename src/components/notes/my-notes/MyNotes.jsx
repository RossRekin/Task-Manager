import React, { useState, useEffect } from 'react';
import { NoteCard } from '../note-card/NoteCard';
import { getNoteByAuthorId, getMyNotes } from '../../../core/api/notes.api';

export function MyNotes(props) {

    const [userNotes, setUserNotes] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getMyNotes(searchParam).then((notes) => {
            setUserNotes(notes);
        });
    }, []);

    return (
        <div className="my-notes-wrapper">
            {userNotes.map(note => <NoteCard note={note} key={note.id} />)}
        </div>
    )
}