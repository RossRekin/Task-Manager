import React from 'react'
import { Link } from 'react-router-dom'
import { deleteNote } from '../../../core/api/notes.api'
import { getLoggedUser } from '../../../core/api/users.api'

const noteCardStyle = {
    maxWidth: '18rem',
    margin: '10px'
}

const pointerStyles = {
    color: 'rgb(255,102,102)',
    cursor: 'pointer'
}


export function NoteCard({ note, onDeleteClick }) {
    const loggedUser = getLoggedUser();

    
    function  evaluationStatus (){

            let evaluation=parseInt(note.evaluation);
            if (evaluation<2) {
                return "card text-white bg-info mb-3";
                
            }
            else if(evaluation>=2 && evaluation<=5){
                return "card text-white bg-warning mb-3";
            }
            else{
                return "card text-white bg-danger mb-3";
            }
        }
        

    return (
        <div className="card text-white bg-dark mb-3" style={noteCardStyle}>
            <div className={(note.isCompleted && "text-success") || "text-warning"}> Status: {(note.isCompleted && "Completed") || "Waiting"}</div>
            <div className={evaluationStatus()} > Evaluation: {note.evaluation} hr</div>
            <div className="card-header">{note.title}
                <div className="cursor-pointer">
                    {(loggedUser.isAdmin || loggedUser.id === note.authorId) && <Link to={`/notes/edit/${note.id}`}>Edit</Link>}
                    {(loggedUser.isAdmin || loggedUser.id === note.authorId) && <div className="cursor-pointer" style={pointerStyles} onClick={() => onDeleteClick(note.id)}>Delete</div>}
                </div>
            </div>

            <div className="card-body">
                <p className="card-text">{note.content}</p>
            </div>
            <div className="" /*className="card-footer bg-transparent border-secondary"*/>
                <div> Author: {note.authorName}</div>
                <div> Created on: {note.date}</div>
                
            </div>
        </div>
    )

}