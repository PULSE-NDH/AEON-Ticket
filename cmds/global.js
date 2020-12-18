const Discord = require('discord.js');  
const fs = require("fs")
exports.run = async (bot, message, args) => {
const channel = message.mentions.channels.first()
if(!channel) return message.reply("Bitte gebe einen Kanal an!")
  const glois = JSON.parse(fs.readFileSync("./global.json", "utf8"));
    glois[message.guild.id] = {
      globalchat: channel.id,
      topic: (`Der Bot ist auf ${bot.guilds.size} und hat somit Kontakt mit ${bot.users.size}`)
    };
    fs.writeFile("./global.json", JSON.stringify(glois), err => {
      if (err) console.log(err);
    });
    message.channel.send(`${channel} wird jetzt als Global Chat benutzt`);
}