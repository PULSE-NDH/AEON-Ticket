const discord = require("discord.js")
exports.run = async (bot , message , args) => {
  let emb = new discord.RichEmbed()
  .setTitle("Help")
  .setThumbnail("https://cdn.glitch.com/0be54144-726d-4e41-bcc5-9ea5c83277c7%2F20060409055611.gif?v=1594547914004")
  .addField("my rank" , "Zeigt deienen Globalen Rank an (**Nicht deinen Server Rank**)")
 
  .addField("g!global #channel" , "Setzt den Global Chat Channel")
  .addField("g!warn @user + Begründung" , "Warnt einen User")
  message.channel.send(emb)
  }
