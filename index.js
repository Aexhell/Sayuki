const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { resolve } = require("path");
const config = require("./config.json");
const walk = require("walk");

fs.readdir("./src/events/", async (err, files) => {
    if (err) return console.error(err);
      var numb = 0;
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
          numb += 1;
      const event = require(`./src/events/${file}`);
      let eventName = file.split(".")[0];
          console.log(`[LOADING] "${eventName}" loaded!`)
      client.on(eventName, event.bind(null, client));
    });
    console.log(`[LOADED] ${files.length} events has been loaded.`);
});

client.commands = new Discord.Collection();
client.categories = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;
  
const walker = walk.walk("./src/commands");
  
walker.on("file", function (root, stats, next) {
    if (!stats.name.endsWith(".js")) return;
    const category = resolve(root).split("\\").slice(-1)[0];
    if (!client.categories.has(category)) {
      client.categories.set(category, []);
    }
  
    let props = require(`${resolve(root)}/${stats.name}`);
    let commandName = stats.name.split(".")[0];
  
    client.commands.set(commandName, props);
    props.aliases.forEach(alias => {
      client.aliases.set(alias, commandName);
    });
    next();
});
  
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`OK`);
});
server.listen(3000);
  
client.login(config.TOKEN);