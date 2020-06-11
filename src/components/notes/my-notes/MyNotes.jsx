import React, { useState, useEffect } from 'react';
import { NoteCard } from '../note-card/NoteCard';
import { getNoteByAuthorId, getMyNotes, deleteNote } from '../../../core/api/notes.api';

const listStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10ox'
};
const cardStyle={
    flexWrap:'wrap'
}

export function MyNotes(props) {

    const [userNotes, setUserNotes] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getMyNotes(searchParam).then((notes) => {
            setUserNotes(notes);
        });
    }, []);
	
	const onDelete = (id) => {
        deleteNote(id).then(() => {
            setUserNotes((prevState) => {
                return prevState.filter(note => note.id !== id);
            })
        })
    };

    return (
         <div className="notes-list d-flex" style={cardStyle}>
            {userNotes.map(note => <NoteCard note={note} key={note.id} onDeleteClick={onDelete} />)}
        </div>
    )
}