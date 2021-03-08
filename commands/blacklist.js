const blacklist = require("../models/blacklist-schema")

module.exports = {
    name: 'blacklist',
    callback: async({message,args}) => {
        let word = args.join(' ')
        let DBUser = await blacklist.findById(message.guild.id)
        if(!DBUser)  await blacklist.findByIdAndUpdate(message.guild.id, {}, {new: true, upsert: true, setDefaultsOnInsert: true})
        if(!word) message.reply('Плохое слово не указано.')
        else{ 
            await blacklist.findByIdAndUpdate(message.guild.id, {$push: {blacklisted: `${word}`}}, {new: true, upsert: true})
            message.reply(`Плохое слово ${word} было добавлено`)
        }
    }
}
