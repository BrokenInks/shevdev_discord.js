const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    guildID: String,
    userID: String,
    clanName: String,
    created_at: Date,
    deleted_at: Date
})

module.exports = mongoose.model('clan-schema', Schema)
