const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'Harryisagoodb$oy'

//Route1 - Create a user using: Post "api/auth/createUser". No login required
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
            const salt = await bcrypt.genSalt(10)
            const secretPassword = await bcrypt.hash(req.body.password, salt)

            user = await User.create({
                name: req.body.name,
                password: secretPassword,
                email: req.body.email,
            })

            const data = {
                user :{
                    id : user.id
                }
            }
            var authToken = jwt.sign(data, JWT_SECRET)
            res.json({authToken})

        }catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    },
)

//Route2 - Login user using: Post "api/auth/login".
router.post('/login',

    [body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()],

    async (req, res) => {

        //Check for errors. If found, return Bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body

        //Check if user with this email exist, if exist, compare the password
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: 'Please try to login with valid credentials' });//'Invalid email'
            }

            const comparePasswords = await bcrypt.compare(password, user.password)
            if(!comparePasswords){
                return res.status(400).json({ error: 'Please try to login with valid credentials' });//'Invalid password'
            }

            const data = {
                user :{
                    id : user.id
                }
            }
            var authToken = jwt.sign(data, JWT_SECRET)
            res.json({authToken})

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    },
)

//Route3 - Get User details: Post "api/auth/getUser".
router.post('/getUser', fetchUser,    

    async (req, res) => {

        try{
            userId = req.user.id//Auth token contains only userId in user object as defined in Login route
            const user = await User.findById(userId).select('-password')            
            res.send(user)
        }catch(error){
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    },
)

module.exports = router