const economy = require('discord-mongo-currency')

module.exports = {
    name: 'pay',
    callback: async({message,args}) => {
        const member = [message.mentions.members.first(), message.author]
        const user = await economy.findUser(member[1].id, message.guild.id)
        let balance = user.coinsInWallet
        if(!member[0]) {
            message.channel.send('Вы не указали кому хотите передать деньги.')
        }
        else if(balance < args[1]) {
            message.channel.send('Вы не можете перевести столько денег.')
        } else if(isNaN(args[1])) {
            message.channel.send('Вы указали не число.')
        } else if(!args[1]) {
            message.channel.send('Вы не указали сумму.')
        } else {
            message.channel.send(`Вы передали ${member[0].user.username} ${args[1]}`)
            await economy.giveCoins(member[0].id, message.guild.id, args[1])
            await economy.deductCoins(member[1].id, message.guild.id, args[1])
        }
    }
}
