const { MessageEmbed } = require('discord.js')
const { statusMessages, suggestionCache } = require('../features/suggest')
module.exports = {
    name: 'suggest',
    callback: async({message, args,client}) => {
        const { guild } = message

        const messageId = args.shift()
        const status = args.shift()
        const reason = args.join(' ')
    
        message.delete()
    
        const newStatus = statusMessages[status]
    
        if (!newStatus) {
          message.reply(
            `Неизвестный статус "${status}", пожалуйста используй ${Object.keys(statusMessages)}`
          )
          return
        }
    
        const channelId = suggestionCache()[guild.id]
        if (!channelId) {
          message.reply('Произошла ошибка, сообщите об этом')
          return
        }
    
        const channel = guild.channels.cache.get(channelId)
        if (!channel) {
          message.reply('Канал предложений больше не существует')
          return
        }
    
        const targetMessage = await channel.messages.fetch(messageId, false, true)
        if (!targetMessage) {
          message.reply('Это сообщение больше не существует')
          return
        }
    
        const oldEmbed = targetMessage.embeds[0]
    
        const embed = new MessageEmbed()
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
          .setDescription(oldEmbed.description)
          .setColor(newStatus.color)
          .setFooter('Хочешь что-то предложить? Напиши это здесь!')
    
        if (oldEmbed.fields.length === 2) {
          embed.addFields(oldEmbed.fields[0], {
            name: 'Статус',
            value: `${newStatus.text}${reason ? ` Причина: ${reason}` : ''}`,
          })
        } else {
          embed.addFields({
            name: 'Статус',
            value: `${newStatus.text}${reason ? ` Причина: ${reason}` : ''}`,
          })
        }
    
        targetMessage.edit(embed)
    }
}
