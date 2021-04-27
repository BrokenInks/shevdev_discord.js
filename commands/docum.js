const axios = require('axios')

module.exports = {
    name: 'docum',
    callback: async({message,args}) => {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
            args
          )}`
        axios.get(uri).then((embed) => {
            const {data} = embed
            if(data && !data.embed) {
                message.channel.send({embed: data})
            } else {
                message.channel.send('Такого нет в документации.')
            }
        })
        
    }
}
