const Levels = require('discord-xp')
const Schema = require('../models/nonexp-schema')
module.exports = (client) => {
    client.on('message', async(message) => {
        if(!message.guild) return
        if(message.author.bot)  return
        const Channel = await Schema.findOne({_id: message.guild.id})
        if(message.channel.id === Channel.channelID) {
            message.channel.send('Здесь опыт не прибавляется!')
        } else{
            let number = [10,20,30]
            let Number = number[Math.floor(Math.random()*(number.length))]
            const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, Number)
            if(hasLeveledUp) {
                const user = await Levels.fetch(message.author.id, message.guild.id)
                message.channel.send(`${message.author}, поздравляю! Теперь твой уровень **${user.level}**`)
            }
        }
    })
}
