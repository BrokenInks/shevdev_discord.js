const messageSchema =  require('../models/message-schema')
module.exports = async (client) => {
    client.on('message', async(message) => {
        let DBUSER = await messageSchema.findById(message.guild.id) 
        const user =  message.author
        if(user.bot) return
        if(!DBUSER) await messageSchema.findByIdAndUpdate(message.guild.id, {userId: user.id}, {new: true, upsert: true, setDefaultsOnInsert: true})
        else{
            await messageSchema.findByIdAndUpdate(message.guild.id, {$inc: {
                message: 1
            }}, {new: true, upsert: true})
            console.log('+1')
        }
    })
}
