const economy = require('discord-mongo-currency')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'balance',
    callback: async({message}) => {
        const member = message.mentions.members.first() || message.member
        const user = await economy.findUser(member.id,message.guild.id)
        if(!user) {
            await economy.createUser(member.id, message.guild.id)
            console.log('Создан новый пользователь')
        }
        else if(!member) {
            message.channel.send(new MessageEmbed()
            .setDescription('Вы не указали участника!')
            .setColor('RED')
            )
        } else {
            message.channel.send(new MessageEmbed() 
            .setDescription(`${member.user.username} имеет ${user.coinsInWallet}`)
            )
        }
    }
}
