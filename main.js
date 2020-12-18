var express = require("express");
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const config = require("./storages/config.json");
const TOKEN = process.env.TOKEN;
const client = bot;
const pings = ["https://discord.gg/"]
const prefix = config.prefix;
bot.on("message", message => {
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (message.channel.name === "general") {
    message.react("✅");
  }

  // Command Handler
  try {
    delete require.cache[require.resolve(`./cmds/${cmd}.js`)];

    let commandFile = require(`./cmds/${cmd}.js`);

    commandFile.run(bot, message, args);
  } catch (e) {
    console.log(e.stack);
  }
});

bot.on("ready", () => {
  console.log(`Glitch ---> ${client.user.tag} = ready`);
  console.log("https://thoracic-band-zone.glitch.me");
  bot.user.setStatus("dnd");
  bot.user.setPresence({
    game: {
      name: "Prefix = g!",
      type: "STREAMING",
      url: "https://twitch.tv/#"
    }
  });
});

bot.on("guildMemberAdd", member => {
  let joinServer = member.guild.channels.get("720797956835639429");
  let joinEmbed = new Discord.RichEmbed()
    .setTitle("Willkommen")
    .setDescription(
      `${member.user.tag} Ist jetzt auf unserem Server \nSeit so nett und schreibt **Willkommen**!`
    )
    .setFooter(`Der ${member.guild.memberCount} User!`)
    .setTimestamp()
    .setColor("GREEN");
  let joinEmbed2 = new Discord.RichEmbed()
  .setTitle("Willkommen")
  .addField("Info" , "Hallo, du als neues Mitglied musst dich erstmal verifizieren. Gebe dazu im Verifizierungschannel $verify ein. Der Rest klärt sich von selbst. Viel spaß auf dem Server.")
  .setTimestamp()
  .setColor("BLUE")
  if (!joinServer) return;
  joinServer.send(joinEmbed)
  member.setNickname(`Member || ${member.user.tag}`)
  member.send(joinEmbed2)
  
}

);
bot.on("guildMemberAdd", member => {
  let joinServer = member.guild.channels.get("721051460036591720");
  let joinEmbed = new Discord.RichEmbed()
    .setTitle("Willkommen")
    .setDescription(
      `${member.user.tag} Ist jetzt auf unserem Server \nSeit so nett und schreibt **Willkommen**!`
    )
    .setFooter(`Der ${member.guild.memberCount} User!`)
    .setTimestamp()
    .setColor("GREEN");
  let joinEmbed2 = new Discord.RichEmbed()
  .setTitle("Willkommen")
  .addField("Info" , "Hallo, du als neues Mitglied musst dich erstmal verifizieren. Gebe dazu im Verifizierungschannel $verify ein. Der Rest klärt sich von selbst. Viel spaß auf dem Server.")
  .setTimestamp()
  .setColor("BLUE")
  if (!joinServer) return;
  joinServer.send(joinEmbed)
  member.setNickname(`Member || ${member.user.tag}`)
  member.send(joinEmbed2)
}

);


bot.on("guildMemberRemove", member => {
  let leaveChannel = member.guild.channels.get("720797967967060059");
  let leaveEmbed = new Discord.RichEmbed()
    .setTitle("Aufwiedersehn")
    .setDescription(
      `${member.user.tag} hat unseren Server verlassen! \nWir hoffen du hattes eine schöne zeit bei auf dem Server!`
    )
    .setColor("RED");

  if (!leaveChannel) return;
  leaveChannel.send(leaveEmbed);
  member.send("Du kannst gerne wieder joinen wenn du nicht gebannt wurdest\r\n https://discord.gg/6hRp75d")
});

client.on("message", async message => {
  const msg = message;
  if (message.channel.type === "dm") return;

  if (message.author.bot) return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[msg.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  if (msg.content.startsWith("rank-test")) {
    const pols1 = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols1[message.author.id]) {
      pols1[message.author.id] = {
        rank: "spieler"
      };
    }
    const polices = pols1[message.author.id].rank;
    const dev = false;

    if (polices == "admin") {
      message.channel.send("Du hast Admin");
    } else {
      msg.channel.send("Du hast kein Admin");
    }
  }

  const globis = sett[msg.guild.id].globalchat;
  if (msg.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    const polices = pols[message.author.id].rank;
    if (pols[message.author.id].rank == "admin") {
      const embed = new Discord.RichEmbed();
      embed.setTitle(":sunglasses: Admin :sunglasses: **|**" + msg.author.tag);
      embed.setDescription(
        "[C𝖚𝖗𝖘𝖊  Global einladen](https://discord.com/api/oauth2/authorize?client_id=719928810870407204&permissions=8&scope=bot) | [Support Server](https://discord.gg/Vuvbg7M)"
      );
      embed.addField("Nachricht:", msg.content);
      embed.setColor("RED");
      embed.setThumbnail(msg.author.avatarURL);
      embed.setFooter(
        "Id: " + message.author.id + "\nServer: " + message.guild
      );
      msg.delete();
      client.guilds.forEach(g => {
        try {
          client.channels.get(sett[g.id].globalchat).send(embed);
        } catch (e) {
          return;
        }
      });
    } else {
      return;
    }
  }
  if (msg.content.startsWith("my rank")) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));

    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    message.channel.send(
      `${message.author.tag}` +
        " " +
        "---->" +
        " " +
        pols[message.author.id].rank +
        " "
    );
  }
});
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  const globals = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!globals[message.guild.id]) {
    globals[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const msg = message;
  const globis = globals[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    const polices = pols[message.author.id].rank;
    if (pols[message.author.id].rank == "p2") return;
    if (pols[message.author.id].rank == "Freunde") return;
    if (pols[message.author.id].rank == "p1") return;
    if (pols[message.author.id].rank == "ban") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "developer") return;
    if (pols[message.author.id].rank == "admin") return;
     if (pols[message.author.id].rank == "sup") return;
    if (pols[message.author.id].rank == "Owner") return;
    if (pols[message.author.id].rank == "Global Polizei") return;

    const embed = new Discord.RichEmbed();
    //  msg.delete()
    embed.setDescription(
      "[Invite](https://discord.com/api/oauth2/authorize?client_id=719928810870407204&permissions=8&scope=bot) | [Support Server](https://discord.gg/Vuvbg7M)"
    );
    embed.setThumbnail(msg.author.avatarURL);
    embed.setColor("#ff9900");
    embed.setTitle("Nutzer: " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("Id: " + message.author.id + "\nServer: " + message.guild);
    client.guilds.forEach(g => {
      try {
        client.channels.get(globals[g.id].globalchat).send(embed);
      } catch (e) {
        return;
      }
    });
    //}
    if (!globals[message.guild.id]) {
      globals[msg.guild.id] = {
        globalchat: "700263604129366086"
      };
    }
    // } else{ return; }
  }

  if (message.channel.id === "695180176996171776") {
    message.delete();
    client.channels
      .get("695180817999069185")
      .send(message.author.tag + "\n" + message.content);
  }
});
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const globis = sett[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    if (pols[message.author.id].rank == "p2") return;
    if (pols[message.author.id].rank == "p1") return;
        if (pols[message.author.id].rank == "Freunde") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "developer") return;
    if (pols[message.author.id].rank == "admin") return;
    if (pols[message.author.id].rank == "spieler") return;
    if (pols[message.author.id].rank == "Owner") return;
    if (pols[message.author.id].rank == "sup") return;
    if (pols[message.author.id].rank == "Global Polizei") return;

    message.delete();
    message.channel
      .send(
        "Du bist ... Gebannt! \nMelde dich bei einer der **Global Polizisten**"
      )
      .then(m => m.delete(10000));
  }
});
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const globis = sett[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    if (pols[message.author.id].rank == "p2") return;
    if (pols[message.author.id].rank == "Freunde") return;
    if (pols[message.author.id].rank == "p1") return;
    if (pols[message.author.id].rank == "ban") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "admin") return;
    if (pols[message.author.id].rank == "sup") return;
    if (pols[message.author.id].rank == "spieler") return;
    if (pols[message.author.id].rank == "developer") return;
    if (pols[message.author.id].rank == "Global Polizei") return;

    const embed = new Discord.RichEmbed();
    embed.setDescription(
      "[C𝖚𝖗𝖘𝖊  Global einladen](https://discord.com/api/oauth2/authorize?client_id=719928810870407204&permissions=8&scope=bot) | [Support Server](https://discord.gg/Vuvbg7M)"
    );
    embed.setThumbnail(message.author.avatarURL);
    embed.setColor("#91ff00");
    embed.setTitle(":crown: Owner :crown: **|** " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("UserID: " + message.author.id + "\nServer: " + message.guild);
    message.delete();
    client.guilds.forEach(g => {
      try {
        client.channels.get(sett[g.id].globalchat).send(embed);
      } catch (e) {
        return;
      }
    });
  }
});
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const globis = sett[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    if (pols[message.author.id].rank == "p2") return;
    if (pols[message.author.id].rank == "p1") return;
    if (pols[message.author.id].rank == "ban") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "admin") return;
    if (pols[message.author.id].rank == "spieler") return;
    if (pols[message.author.id].rank == "Owner") return;
if (pols[message.author.id].rank == "sup") return;
    if (pols[message.author.id].rank == "Global Polizei") return;
    if (pols[message.author.id].rank == "Freunde") return;
    const embed = new Discord.RichEmbed();
    embed.setDescription(
      "[Invite](https://discord.com/api/oauth2/authorize?client_id=719928810870407204&permissions=8&scope=bot) | [Support Server](https://discord.gg/Vuvbg7M)"
    );
    embed.setThumbnail(message.author.avatarURL);
    embed.setColor("BLUE");
    embed.setTitle("Developer: **|** " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("Id: " + message.author.id + "\nServer: " + message.guild);
    message.delete();
    client.guilds.forEach(g => {
      try {
        client.channels.get(sett[g.id].globalchat).send(embed);
      } catch (e) {
        return;
      }
    });
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const globis = sett[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    if (pols[message.author.id].rank == "p2") return;
    if (pols[message.author.id].rank == "ban") return;
    if (pols[message.author.id].rank == "p1") return;
    if (pols[message.author.id].rank == "supporter") return;
    if (pols[message.author.id].rank == "admin") return;
    if (pols[message.author.id].rank == "developer") return;
    if (pols[message.author.id].rank == "spieler") return;
    if (pols[message.author.id].rank == "Owner") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "sup") return;
    if (pols[message.author.id].rank == "Global Polizei") return;

    const embed = new Discord.RichEmbed();
    embed.setDescription(
      "[Invite](https://discord.com/api/oauth2/authorize?client_id=719928810870407204&permissions=8&scope=bot) | [Support Server](https://discord.gg/Vuvbg7M)"
    );
    embed.setThumbnail(message.author.avatarURL);
    embed.setColor("3d415a");
    embed.setTitle("Freunde: **|** " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("Id: " + message.author.id + "\nServer: " + message.guild);
    message.delete();
    client.guilds.forEach(g => {
      try {
        client.channels.get(sett[g.id].globalchat).send(embed);
      } catch (e) {
        return;
      }
    });
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const globis = sett[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    if (pols[message.author.id].rank == "p2") return;
    if (pols[message.author.id].rank == "ban") return;
    if (pols[message.author.id].rank == "supporter") return;
    if (pols[message.author.id].rank == "admin") return;
    if (pols[message.author.id].rank == "developer") return;
    if (pols[message.author.id].rank == "spieler") return;
    if (pols[message.author.id].rank == "Owner") return;
if (pols[message.author.id].rank == "sup") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "Freunde") return;
    if (pols[message.author.id].rank == "Global Polizei") return;

    const embed = new Discord.RichEmbed();
    embed.setDescription(
      "[Partner Server Invite](https://discord.gg/J3qmZpr) | [Support Server](https://discord.gg/Vuvbg7M)"
    );
    embed.setThumbnail(message.author.avatarURL);
    embed.setColor("BLUE");
    embed.setTitle("Global Partner: **|** " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("Id: " + message.author.id + "\nServer: " + message.guild);
    message.delete();
    client.guilds.forEach(g => {
      try {
        client.channels.get(sett[g.id].globalchat).send(embed);
      } catch (e) {
        return;
      }
    });
  }
});


client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const globis = sett[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    if (pols[message.author.id].rank == "p2") return;
    if (pols[message.author.id].rank == "p1") return;
    if (pols[message.author.id].rank == "ban") return;
    if (pols[message.author.id].rank == "supporter") return;
    if (pols[message.author.id].rank == "admin") return;
    if (pols[message.author.id].rank == "developer") return;
    if (pols[message.author.id].rank == "spieler") return;
    if (pols[message.author.id].rank == "sup") return;
    if (pols[message.author.id].rank == "Owner") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "Freunde") return;

    const embed = new Discord.RichEmbed();
    embed.setDescription(
      "[Invite](https://discord.com/api/oauth2/authorize?client_id=719928810870407204&permissions=8&scope=bot) | [Support Server](https://discord.gg/Vuvbg7M)"
    );
    embed.setThumbnail(message.author.avatarURL);
    embed.setColor("BLUE");
    embed.setTitle(":oncoming_police_car: Global Polizei :oncoming_police_car: **|** " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("Id: " + message.author.id + "\nServer: " + message.guild);
    message.delete();
    client.guilds.forEach(g => {
      try {
        client.channels.get(sett[g.id].globalchat).send(embed);
      } catch (e) {
        return;
      }
    });
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const globis = sett[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    if (pols[message.author.id].rank == "p1") return;
    if (pols[message.author.id].rank == "p2") return;
    if (pols[message.author.id].rank == "ban") return;
    if (pols[message.author.id].rank == "supporter") return;
    if (pols[message.author.id].rank == "admin") return;
    if (pols[message.author.id].rank == "developer") return;
    if (pols[message.author.id].rank == "spieler") return;
    if (pols[message.author.id].rank == "Owner") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "Freunde") return;
    if (pols[message.author.id].rank == "Global Polizei") return;

    const embed = new Discord.RichEmbed();
    embed.setDescription(
      "[Invite](https://discord.com/api/oauth2/authorize?client_id=719928810870407204&permissions=8&scope=bot) | [Support Server](https://discord.gg/Vuvbg7M)"
    );
    embed.setThumbnail(message.author.avatarURL);
    embed.setColor("#8c55ab");
    embed.setTitle(":fleur_de_lis: Supporter :fleur_de_lis: **|** " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("Id: " + message.author.id + "\nServer: " + message.guild);
    message.delete();
    client.guilds.forEach(g => {
      try {
        client.channels.get(sett[g.id].globalchat).send(embed);
      } catch (e) {
        return;
      }
    });
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
  const globis = sett[message.guild.id].globalchat;
  if (message.channel.id === globis) {
    const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
    if (!pols[message.author.id]) {
      pols[message.author.id] = {
        rank: "spieler"
      };
    }
    if (pols[message.author.id].rank == "ban") return;
    if (pols[message.author.id].rank == "supporter") return;
    if (pols[message.author.id].rank == "admin") return;
    if (pols[message.author.id].rank == "developer") return;
    if (pols[message.author.id].rank == "spieler") return;
    if (pols[message.author.id].rank == "Owner") return;
    if (pols[message.author.id].rank == "sup") return;
    if (pols[message.author.id].rank == "p1") return;
    if (pols[message.author.id].rank == "RΞΤRΘΒΘΧ") return;
    if (pols[message.author.id].rank == "Freunde") return;
    if (pols[message.author.id].rank == "Global Polizei") return;
    

    const embed = new Discord.RichEmbed();
    embed.setDescription(
      "[Partner Server Invite](https://discord.gg/gsKN6My) | [Support Server](https://discord.gg/Vuvbg7M)"
    );
    embed.setThumbnail(message.author.avatarURL);
    embed.setColor("BLUE");
    embed.setTitle("Global Partner: **|** " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("Id: " + message.author.id + "\nServer: " + message.guild);
    message.delete();
    client.guilds.forEach(g => {
      try {
        client.channels.get(sett[g.id].globalchat).send(embed);
      } catch (e) {
        return;
      }
    });
  }
});

bot.login("NzM4NDg1Nzk5NDY0NTk5NjUz.XyMmfg.Y-ExicfyyRq5JhO_L975ZHiVUpE");
