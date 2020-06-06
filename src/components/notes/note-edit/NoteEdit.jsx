import React, { useState, useEffect } from 'react'
import { saveNote, getNoteById } from '../../../core/api/notes.api';
import { Redirect } from 'react-router-dom';
import './NoteEdit.css'

export function NoteEdit(props) {

    const [currentNote, setCurrentNote] = useState({ title: '', content: '', authorId: '', authorName: '', date: '',evaluation:0, isCompleted: false });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getNoteById(props.computedMatch.params.id).then((result) => {
                setCurrentNote(result.data);
            });
        }
    }, [props.computedMatch.params.id]);


    const onInputChange = (event) => {
        event.persist();
        setCurrentNote((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }


    const onCheckBoxChange = (event) => {
        event.persist();
        setCurrentNote((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked
        }))

        if (error) {
            setError('');
        }
    };


    const onNoteSave = (event) => {
        event.preventDefault();
        saveNote(currentNote).then(() => {
            setShouldRedirect(true);
        })
            .catch((err) => console.error(err));
    }

    return (
        <>
            {shouldRedirect && <Redirect to="/notes" />}
            <div className="note-edit-wrapper">
                <form className="note-edit-form" onSubmit={onNoteSave}>
                    <div className="form-group">
                        <label labelfor="Title">Title</label>
                        <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentNote.title}></input>
                    </div>
                    <div className="form-group">
                        <label labelfor="content">Content</label>
                        <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentNote.content}></textarea>
                    </div>
                    <div className="form-group">
                        <label labelfor="content">Evaluation(hr)</label>
                        <input type="number" name="evaluation" id="evaluation" min="0" max="100" className="form-control" onChange={onInputChange} value={currentNote.evaluation} />
                    </div>
                    <div className="form-group">
                        <label labelfor="status">Status</label>
                        <div className="form-group">
                            <label labelfor="isAdmin">Is Completed: </label>
                            <input type="checkbox" name="isCompleted" id="isCompleted" className="form-control" onChange={onCheckBoxChange} checked={currentNote.isCompleted} />
                        </div>
                    </div>
                    <button className="btn btn-primary">Save notes</button>
                </form>
            </div>
        </>
    )
}