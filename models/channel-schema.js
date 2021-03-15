const mongoose =  require('mongoose')

const reqString = {
    type: String,
    required: true
}

const channelSchema =  mongoose.Schema({
    _id: reqString,
    channelId: reqString
})

module.exports = mongoose.model('idea-channel', channelSchema)
