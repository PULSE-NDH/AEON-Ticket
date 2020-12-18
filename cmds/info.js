const discord = require("discord.js")
exports.run = async (bot , message , args) => {
  message.channel.send("Ich bin your Global").then(mess => {
  mess.pin()  
  })
  
}