const discord = require("discord.js")
const fs = require("fs");

module.exports.run = (bot, message, args, prefix) => {


    const ss2 = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!ss2[message.author.id]) {
      ss2[message.author.id] = {
        rank: "spieler"
      };
    }
    const mss = ss2[message.author.id].rank;
    if (mss == "spieler") return message.reply("Du bist kein Developer");
    if (mss == "Freunde") return message.reply("Du bist kein Developer");
    if (mss == "p1") return message.reply("Du bist kein Developer")
    if (mss == "partner") return message.reply("Du bist kein Developer");    

    const emb = new discord.RichEmbed()
  .setTitle("Bot Info")
  .addField("Auf wie vielen Servern ist der Bot?" , `Der Bot ist auf ${bot.guilds.size} Servern`)
  .addField("Mit wie vielen Usern ist der Bot verbunden?" , `Der Bot ist mit ${bot.users.size} usern verbunden`)
  .setColor("GREEN")
  message.reply(emb)
}