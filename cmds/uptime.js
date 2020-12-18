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
    if (mss == "partner") return message.reply("Du bist kein Developer");    

    require("moment-duration-format");
    const uptime = moment.duration(bot.uptime).format(" D [Tage], H [Stunden], m [Minuten], s [Sekunden]");
    message.channel.send(uptime)
}