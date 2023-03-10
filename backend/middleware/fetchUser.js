const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagoodb$oy'

fetchUser = (req, res, next) => {

    //Get the user from the token, verify and add it to the request
    const authToken = req.header('auth-token')
    if (!authToken) {
        res.status(401).send({ error: 'Please authenticate using a valid token' })
    } else {
        try {
            const data = jwt.verify(authToken, JWT_SECRET)
            req.user = data.user//Auth token contains only userId in user object as defined in Login route
            next()
        } catch (error) {
            res.status(401).send({ error: 'Please authenticate using a valid token' })
        }
    }
}

module.exports = fetchUser