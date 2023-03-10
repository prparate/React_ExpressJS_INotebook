const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

//Route1 - Get all the notes: GET "api/notes/fetchAllNotes". Login required
router.get('/fetchAllNotes', fetchUser,

    async (req, res) => {

        try {
            const notes = await Note.find({ user: req.user.id })
            res.json(notes)
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    }
)

//Route2 - Add a new note: POST "api/notes/addNote". Login required
router.post('/addNote', fetchUser,

    [body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 10 })],

    async (req, res) => {

        try {
            const { title, description, tag } = req.body

            //Check for errors. If found, return Bad request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //Create a new Note
            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save()
            res.json(savedNote)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    }
)


//Route3 - Update an existing note: PUT "api/notes/updateNote". Login required
router.put('/updateNote/:id', fetchUser,

    [body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 10 })],

    async (req, res) => {

        const { title, description, tag } = req.body

        try {

            //Create a newNote object
            const newNote = {}
            if (title) {
                newNote.title = title
            }
            if (description) {
                newNote.description = description
            }
            if (tag) {
                newNote.tag = tag
            }

            //Find a note to be updated
            let note = await Note.findById(req.params.id)
            if (!note) {
                return res.status(404).send("Note not found")
            }

            //Allow updation only if user own this note
            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Note not allowed to update")
            }

            //Find and update the existing note
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })//{ new: true } creates new user if does not exist. In this case it is not required, as note is present check is made. Kept { new: true } for reference purpose
            res.json({ note })

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    }
)


//Route4 - Delete an existing note: DELETE "api/notes/deleteNote". Login required
router.delete('/deleteNote/:id', fetchUser,

    async (req, res) => {

        try {

            //Find a note to be delete
            let note = await Note.findById(req.params.id)
            if (!note) {
                return res.status(404).send("Note not found")
            }

            //Allow deletion only if user own this note
            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Note not allowed to update")
            }

            //Find and delete the existing note
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ 'Success': 'Note has been deleted', note: note })

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    }
)


module.exports = router