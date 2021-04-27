const {create} =require('sourcebin')

module.exports = (client) => {
    client.on('message', (message) => {
        if(message.author.bot) return
        if(message.content.length > 50) {
            create([
                {
                    content: message.content,
                    language: 'javascript'
                }
            ]).then((bin) => {
                message.reply(`Вот ваша ссылка на код: ${bin.url}`)
            })
            message.delete()
        }
    })
}
