const Discord = require("discord.js")
const fs = require("fs");
module.exports.run = (bot, message, args, prefix) => {
  

    const ss2 = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!ss2[message.author.id]) {
      ss2[message.author.id] = {
        rank: "spieler"
      };
    }
    const mss = ss2[message.author.id].rank;
        if (mss == "p1") return message.reply("Du bist kein owner / admin!");
    if (mss == "ban") return message.reply("Du bist kein owner / admin!");
    if (mss == "sup") return message.reply("Du bist kein owner/ admin!");
    if (mss == "p2") return message.reply("Du bist kein owner / admin");
    if (mss == "spieler") return message.reply("Du bist kein owner / admin!");
    if (mss == "RΞΤRΘΒΘΧ") return message.reply("Du bist kein owner / admin")
    if (mss == "developer") return message.reply("Du bist kein owner / admin!");
    if (mss == "Developer") return message.reply("Du bist kein owner / admin!");
    const member = message.mentions.members.first();
    if (!member) return message.reply("Gebe einen user an!");
    if (
      !args[1] ||
      !args[1] === ["spieler", "admin", "developer", "supporter", "partner" , "Owner" , "RΞΤRΘΒΘΧ" , "Global Polizei"]
    )
      return message.reply("Gebe einen rang an!");
    ss2[member.id] = {
      rank: args[1]
    };
    fs.writeFile("./ranks.json", JSON.stringify(ss2), err => {
      if (err) console.log(err);
    });
    message.channel.send("Erfolg!");
  
}
