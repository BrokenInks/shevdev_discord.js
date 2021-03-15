const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const nonexpSchema = mongoose.Schema({
    _id: reqString,
    channelID: reqString
})

module.exports = mongoose.model('nonexp-schema', nonexpSchema)
