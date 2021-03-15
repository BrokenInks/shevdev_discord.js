const Levels = require('discord-xp')
module.exports = (client) => {
    client.on('message', async(message) => {
        if(!message.guild) return
        if(message.author.bot)  return
        let number = [10,20,30]
        let Number = number[Math.floor(Math.random()*(number.length))]
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, Number)
        if(hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id)
            message.channel.send(`${message.author}, поздравляю! Теперь твой уровень **${user.level}**`)
        }
        
    })
}
