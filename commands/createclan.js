const {MessageEmbed} = require('discord.js')
const economy = require('discord-mongo-currency')
const userSchema = require('../models/clan-schema')
const {addSeconds} = require('date-fns')
module.exports = {
    name: 'createclan',
    callback: async({message,args}) => {
        

        const user = await economy.findUser(message.author.id, message.guild.id)
        const member = await userSchema.findOne({userID: message.author.id})
        const money = user.coinsInWallet
        const name = args.join(' ')
        const dateSeconds = addSeconds(Date.now(), 20)


        function addMessage(value) {
            message.reply(value)
        }
        function deleteMoney(number) {
            economy.deductCoins(message.author.id, message.guild.id, number)
        }
        function addSchema(value1, value2, value3, value4, value5) {
            new userSchema({
                guildID: value1,
                userID: value2,
                clanName: value3,
                created_at: value4,
                deleted_at: value5
            }).save()
        }


        if(!name) return addMessage('Вы не ввели название клана')
        if(money < 100) return addMessage('У вас недостаточно средств')
        if(money > 100) {
            if(member) return addMessage('У вас уже есть клан')
            deleteMoney(100)
            addMessage('Ваш клан успешно создан')
            addSchema(message.guild.id, message.author.id, name, Date.now(), dateSeconds)
        }

    }
}
