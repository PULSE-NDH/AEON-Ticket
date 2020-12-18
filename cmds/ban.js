const discord = require("discord.js")
const fs = require("fs");

module.exports.run = (client, message, args, prefix) => {

    const ss2 = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!ss2[message.author.id]) {
      ss2[message.author.id] = {
        rank: "spieler"
      };
    }
    const mss = ss2[message.author.id].rank;
    if (mss == "RΞΤRΘΒΘΧ") return message.reply("Du bist keine Global Chat Polizei oder Admin");
    if (mss == "developer") return message.reply("Du bist keine Global Chat Polizei oder Admin");
    if (mss == "spieler") return message.reply("Du bist keine Global Chat Polizei oder Admin");
    if (!args[0]) return message.reply("Gebe einen user an!");
    const member = client.users.get("id", args[0]);
    ss2[args[0]] = {
      rank: "ban"
    };
    fs.writeFile("./ranks.json", JSON.stringify(ss2), err => {
      if (err) console.log(err);
    });
    message.channel.send("Gebannt")

}
module.exports.help = {
    name: "gban"
  }
//    if (pols[message.author.id].rank == "ban") return;
