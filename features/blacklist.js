const blacklisted = require('../models/blacklist-schema')

module.exports = (client) => {
   client.on('message', async(message) => {
       const doc = await blacklisted.findById(message.guild.id)
       if(doc && doc.blacklisted) {
           doc.blacklisted.forEach(word => {
               if(message.content.includes(word)) {
                   message.delete()
               }
           })
       }
   })
}
