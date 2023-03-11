import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {

    const initialNotes = [
        {
          "_id": "640b3ecee261028f6966b77c",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        },
        {
          "_id": "640b40f84708cf4f2502ae87",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        },
        {
          "_id": "640b40f94708cf4f2502ae89",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        },
        {
          "_id": "640b40fa4708cf4f2502ae8b",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        },
        {
          "_id": "640b40f94708cf4f2502ae89",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        },
        {
          "_id": "640b40fa4708cf4f2502ae8b",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        },
        {
          "_id": "640b40fa4708cf4f2502ae8b",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        },
        {
          "_id": "640b40f94708cf4f2502ae89",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        },
        {
          "_id": "640b40fa4708cf4f2502ae8b",
          "user": "640a786dbf48a93c9756fd34",
          "title": "Email4 note 1",
          "description": "My first note for email4",
          "tag": "123",
          "__v": 0
        }
      ]

    const[notes, setNotes] = useState(initialNotes)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState