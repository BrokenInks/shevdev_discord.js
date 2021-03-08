const mongoose = require('mongoose')

const blacklistSchema =  new mongoose.Schema({
    _id: String,
    blacklisted: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('blacklist-words', blacklistSchema)
