const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', () => {
    const umnie = 'Бот готов!'
    console.log(umnie)
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    }
  new WOKCommands(client, {
    commandsDir: 'commands',
    featureDir: 'features',
    dbOptions
  })
    .setMongoPath(process.env.MONGO_URI)
    .setDefaultPrefix('.')
})




client.login(process.env.TOKEN)
