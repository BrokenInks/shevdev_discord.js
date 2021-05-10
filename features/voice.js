const {Collection} = require('discord.js')
let privateVoice = new Collection()
module.exports = (client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        const user = await client.users.fetch(newState.id)
        const member = newState.guild.member(user)
        if(!oldState.chanel && newState.channel.id === 'ID YOUR CHANNEL') {
            const channel = await newState.guild.channels.create(`Приват ${user.tag}`, {
                type: 'voice',
                parent: newState.channel.parent
            })
            member.voice.setChannel(channel)
            privateVoice.set(user.id, channel.id)
        } 
        else if(!newState.channel) {
            if(oldState.channelID === privateVoice.get(newState.id)) {
                return oldState.channel.delete()
            }
        }
    })
}
