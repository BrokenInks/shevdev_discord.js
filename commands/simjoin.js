module.exports = {
    name: 'simjoin',
    callback: ({message,client}) => {
        client.emit('guildMemberAdd', message.member)
    }
}
