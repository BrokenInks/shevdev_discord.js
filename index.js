const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
const mongoCurrency = require('discord-mongo-currency');
const updateDeletedGuild = require('./utils/deleted.js')
mongoCurrency.connect('mongodb://localhost:27017/tutorial');

const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', () => {
  setInterval(() => {
    updateDeletedGuild(client)
  }, 5000)
  console.log('Бот готов к работе!')
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
