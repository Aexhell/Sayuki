module.exports = {
	name: "help",
	aliases: ["ayuda"],
	execute: async (client, message, args) => {
		const Discord = require("discord.js");
		const storage = client.storage.lang.commands.help;

		let helpEmbed = {
			author: {
				name: message.author.tag,
				icon_url: message.author.displayAvatarURL()
			},
			title: storage.title,
			color: "RANDOM",
			description: storage.commands.replace("{c}",client.commands.array().length-1),
			fields: [
				{
					name: "General:",
					value: storage.general
				},
				{
					name: "Mod:",
					value: storage.mod
				},
				{
					name: storage.economy,
					value: storage.eco
				},
				{
					name: storage.dev,
					value: storage.developers
				},
				{
					name: storage.funtitle,
					value: storage.fun
				}
			],
			footer: {
				text: `rel. version ${client.config.version}`,
				icon_url: client.user.displayAvatarURL()
			}
		}

		message.channel.send({ embed: helpEmbed });
	}
}