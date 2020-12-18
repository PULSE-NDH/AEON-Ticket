const discord = require("discord.js")
exports.run = async (bot , message , args) => {
   const mention = message.mentions.members.first()
    mention.setNickname(`${message.author.tag}`)
    message.author.send(`Du hast einen Namen auf **${message.guild.name}** geändert.\r\n Dies wurde an ${message.guild.owner} gesendet. Infos:\r\nGeänderter Name:${mention}\r\nServer:${message.guild}\r\nOwner:${message.guild.owner}`)
    message.guild.owner.send(`<@${message.author.id}> hat den namen von ${mention} geändert`)
  
}
