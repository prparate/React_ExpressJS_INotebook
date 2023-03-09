const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook'//when db name is not mentioned, mongo will create default db test

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    console.log('connected to mongoDB successfully')
}

module.exports = connectToMongo