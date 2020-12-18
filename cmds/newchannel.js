const discord = require("discord.js");
exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "Du kannst doch nicht einfach ohne Erlaubnis Channels erstellen"
    );

  let emb = new discord.RichEmbed()
    .setTitle("Global Chat")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Du hast einen Channel erstellt`)
    .addField(
      `${bot.user.tag} ----> ${message.author.tag}`,
      "Vielen dank das du den Global Bot benutzt"
    )
    .setColor("GREEN");
  message.author.send(emb);

  message.guild.createChannel(`${args.join(" ")}`, {
    topic: `Du kannst jetzt g!global + channel eingeben damit dieser channel als global chat genutzt wird!`,
    type: "text",
  });
  
  const channel = message.mentions.channels.first()
  const glois = JSON.parse(fs.readFileSync("./global.json", "utf8"));
    glois[message.guild.id] = {
      globalchat: channel.id,
    };
    fs.writeFile("./global.json", JSON.stringify(glois), err => {
      if (err) console.log(err);
    });
};
