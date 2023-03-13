import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {

    const hostURL = 'http://localhost:5000/'
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYTc4NmRiZjQ4YTkzYzk3NTZmZDM0In0sImlhdCI6MTY3ODQ0OTEyOX0.DzL0fW7CcBzy-m2YTE27gH0CIaMAJXiVMygWm298QWk'

    const [notes, setNotes] = useState([])

    const fetchAllNotes = async () => {

        const url = hostURL + 'api/notes/fetchAllNotes'
        const response = await fetchApiData(url, 'GET', authToken)
        setNotes(response)
    }

    const addNote = async (title, description, tag) => {

        const url = hostURL + 'api/notes/addNote'
        const response = await fetchApiData1(url, 'POST', authToken, { title, description, tag })
        setNotes(notes.concat(response))
    }

    const editNote = async (id, title, description, tag) => {

        const url = hostURL + 'api/notes/updateNote/' + id
        await fetchApiData1(url, 'PUT', authToken, { title, description, tag })

        const newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break
            }
        }
        setNotes(newNotes)

    }

    const deleteNote = async (id) => {

        const url = hostURL + 'api/notes/deleteNote/' + id
        await fetchApiData(url, 'DELETE', authToken)

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    const fetchApiData = async (url, methodType, authToken) => {

        const response = await fetch(url, {
            method: methodType,
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            }
        });
        return response.json();
    }

    const fetchApiData1 = async (url, methodType, authToken, body) => {

        const response = await fetch(url, {
            method: methodType,
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    return (
        <NoteContext.Provider value={{ notes, fetchAllNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState