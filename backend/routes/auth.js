const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

//Create a user using: Post "api/auth/createUser". No login required
router.post('/createUser',

    [body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })],

    async (req, res) => {

        //Check for errors. If found, return Bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Check if user with this email exist
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: 'User with this email already exist' });
            }
            user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            })
            res.json(user)

        }catch (error) {
            console.error(error.message)
            res.status(500).send('Some error occurred')
        }
    },
)

module.exports = router