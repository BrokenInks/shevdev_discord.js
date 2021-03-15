const Schema = require('../models/nonexp-schema')
module.exports = {
    name: 'nonexpchannel',
    callback: async({message,args}) => {
        const kanal = message.mentions.channels.first()
        if(!kanal) return message.channel.send('Вы не указали канал')
        Schema.findOne({_id: message.guild.id}, async(err,data) => {
            if(data) {
                return
            } else {
                new Schema({
                    _id: message.guild.id,
                    channelID: kanal.id
                }).save()
            }
        })
    }
}
