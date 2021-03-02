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
    .setDefaultPrefix('.')
})
const Canvas = require('canvas')
client.on('guildMemberAdd', async(member) => {
if(!member.guild) return
const canvas = Canvas.createCanvas(1772, 633)
const ctx = canvas.getContext('2d')
const background = await Canvas.loadImage('./welcome.png')
ctx.drawImage(background, 0 , 0, canvas.width, canvas.height)
ctx.strokeStyle = '#f2f2f2'
ctx.strokeRect(0, 0 , canvas.width, canvas.height)
var text1 = `${member.user.username}`
var text2 = `${member.user.discriminator}`
var text3 = `Участник #${member.guild.memberCount}`
var text4 = `${member.guild.name}`
if(text1.length >= 14) {
  ctx.font = 'bold 100px Sans-Serif'
  ctx.fillStyle = '#f2f2f2'
  ctx.fillText(text1, 720, canvas.height / 2 +20)
}
else {
  ctx.font = 'bold 150px Sans-Serif'
  ctx.fillStyle = '#f2f2f2' 
  ctx.fillText(text1, 720, canvas.height / 2 + 20)
}
//Дискриминатор
ctx.font = 'bold 40px Sans-Serif'
ctx.fillStyle = '#f2f2f2'
ctx.fillText(text2, 730, canvas.height / 2 + 58)
//Участники
ctx.font = 'bold 60px Sans-Serif'
ctx.fillStyle = '#f2f2f2'
ctx.fillText(text3, 750, canvas.height / 2 + 135)
//Гильдия
ctx.font = 'bold 60px Sans-Serif'
ctx.fillStyle = '#f2f2f2'
ctx.fillText(text4, 700, canvas.height / 2 - 150)

ctx.beginPath()
ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true)
ctx.closePath()
ctx.clip()

const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg'}))
ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500)
const attachment = new DiscordJS.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
const welcome = new DiscordJS.MessageEmbed()
  .setColor('RED')
  .setTimestamp()
  .setImage('attachment://welcome-image.png')
  .attachFiles(attachment)
  const channel = member.guild.channels.cache.find(ch => ch.id === 'ID вашего канала')
  channel.send(welcome)
})



client.login(process.env.TOKEN)
