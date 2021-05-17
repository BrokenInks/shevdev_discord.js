const Schema = require('../models/clan-schema')
const {isPast} = require('date-fns')
const {Client} = require('discord.js')

const updateDeleted = async(client) => {
    const clans = await Schema.find({})
    for(const clan of clans) {
        if(isPast(clan.deleted_at)) {
            deletedClan(clan.userID, client)
        }
    }
}

/**
 * 
 * @param {string} guildID
 * @param {string} userID
 * @param {Client} client
 */
const deletedClan = async(userID) => {
    await Schema.findOneAndDelete({userID: userID})
}

module.exports = updateDeleted
