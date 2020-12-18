const Discord = require('discord.js');
const fs = require("fs");

exports.run = (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Dies kannst du nicht tun!");
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Du musst jemanden Erwähnen.');
  if (reason.length < 1) return message.reply('You must have a reason for the warning.');

  let dmsEmbed = new Discord.RichEmbed()
  .setTitle("Warnung")
  .setColor("#00ff00")
  .setDescription(`Du wurdest gewarnt auf \`${message.guild.name}\``)
  .addField("Gewarnt von", message.author.tag)
  .addField("Grund", reason);

  user.send(dmsEmbed);

  message.delete();
  
  message.channel.send(`${user.tag} wurde gewarnt`).then(mess => {
  mess.pin()  
  })

}

exports.help = {
  name: 'warn'
};
