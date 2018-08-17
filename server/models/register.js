const mongoose = require('mongoose')
const Schema = mongoose.Schema

const regSchema = new Schema({
    created:String,
    name:String,
    email: String,
    phone:String
})

module.exports = mongoose.model('regis',regSchema,'register')