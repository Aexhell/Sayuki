const Discord = require("discord.js"), client = new Discord.Client(), fs = require("fs"), config = require("./src/utils/config.json");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')), eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	client.commands.set(command.name, command);
	command.aliases.forEach(alias => {
		client.aliases.set(alias, command.name);
	});
}

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	let eventName = file.split(".")[0];
	client.on(eventName, event.bind(null, client));
}
  
const http = require('http'), server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(`OK`);
});
server.listen(3000);
  
client.login(process.env.TOKEN);