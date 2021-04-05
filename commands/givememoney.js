const {MessageEmbed} = require('discord.js')
const economy = require('discord-mongo-currency')
module.exports = {
    name: 'givememoney',
    callback: async({message}) => {
        const randomMoney = Math.floor(Math.random() * 99) +1
        await economy.giveCoins(message.member.id, message.guild.id, randomMoney)
    }
}
