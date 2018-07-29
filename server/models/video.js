const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('video',videoSchema,'videos')