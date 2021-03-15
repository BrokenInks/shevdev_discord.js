const channelSchema = require('../models/channel-schema')
const {MessageEmbed} = require('discord.js')
const statusMessages = {
    WAITING: {
      text: '📊 Используйте реакции ниже, чтобы проголосовать!',
      color: 0xffea00,
    },
    ACCEPTED: {
      text: '✅ Идея принята!',
      color: 0x34eb5b,
    },
    DENIED: {
      text:
        '❌ Спасибо за идею, но в ближайшее время она реализована не будет.',
      color: 0xc20808,
    },
  }
  
  let suggestionCache = {} // { guildId: channelId }
  
  const fetchSuggestionChannels = async (guildId) => {
    let query = {}
  
    if (guildId) {
      query._id = guildId
    }
  
    const results = await channelSchema.find(query)
  
    for (const result of results) {
      const { _id, channelId } = result
      suggestionCache[_id] = channelId
    }
  }
  
  module.exports = (client) => {
    fetchSuggestionChannels()
  
    client.on('message', (message) => {
      const { guild, channel, content, member } = message
  
      const cachedChannelId = suggestionCache[guild.id]
      if (cachedChannelId && cachedChannelId === channel.id && !member.user.bot) {
        message.delete()
  
        const status = statusMessages.WAITING
  
        const embed = new MessageEmbed()
          .setColor(status.color)
          .setAuthor(member.displayName, member.user.displayAvatarURL())
          .setDescription(content)
          .addFields({
            name: 'Статус',
            value: status.text,
          })
          .setFooter('Хочешь что-то предложить? Напиши это здесь!')
  
        channel.send(embed).then((message) => {
          message.react('👍').then(() => {
            message.react('👎')
          })
        })
      }
    })
  }
  
  module.exports.fetchSuggestionChannels = fetchSuggestionChannels
  
  module.exports.statusMessages = statusMessages
  
  module.exports.suggestionCache = () => {
    return suggestionCache
  }
