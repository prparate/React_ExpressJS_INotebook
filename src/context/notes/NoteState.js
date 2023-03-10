import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {

    const stateNote = {
        'name': 'abc',
        'class': '5a'
    }

    const [stateN, setStateN] = useState(stateNote)

    const updateStateN = () => {
        setTimeout(() => {
            setStateN({
                'name': 'xyz',
                'class': '10a'
            })
        }, 2000);
    }

    return (
        <NoteContext.Provider value={{ stateN, updateStateN }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState