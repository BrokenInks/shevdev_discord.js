const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const messageSchema = mongoose.Schema({
    _id: String,
    userId: String,
    message: Number
})

module.exports = mongoose.model('message-schema', messageSchema)
