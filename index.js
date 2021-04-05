const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const mongoCurrency = require('discord-mongo-currency');
 
mongoCurrency.connect('mongodb://localhost:27017/tutorial');

const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', () => {
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
