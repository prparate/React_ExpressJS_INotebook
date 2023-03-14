import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {

    const context = useContext(noteContext)

    const { addNote } = context

    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const handleAddNote = (event) => {
        event.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: '', description: '', tag: '' })
        props.showAlert('Note Added successfully', 'success')
    }

    return (
        <div className='container my-3' >
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handleChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 10} type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
