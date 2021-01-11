module.exports = {
	name: "about",
	aliases: ["stats"],
	execute: async (client, message, args) => {
		const Discord = require("discord.js");
		const config = client.config;
		const storage = client.storage.lang.commands.about;

		let aboutEmbed = {
			title: storage.title,
			color: "RANDOM",
			footer: {
				text: `rel. ${config.version}`,
				icon_url: client.user.displayAvatarURL()
			},
			author: {
				name: message.author.tag,
				icon_url: message.author.displayAvatarURL()
			},
			fields: [
				{
					name: storage.dev,
					value: "Aex.",
					inline: true
				},
				{
					name: storage.date,
					value: "2018/2019.",
					inline: true
				},
				{
					name: storage.library,
					value: "Discord.js",
					inline: true
				},
				{
					name: "Servers:",
					value: `**${client.guilds.cache.size}** servers.`,
					inline: true
				},
				{
					name: "Users:",
					value: `**${client.guilds.cache.size}** users.`,
					inline: true
				},
				{
					name: storage.channels,
					value: `**${client.channels.cache.size}** ${storage.channels2}.`,
					inline: true
				}
			]
		}

		message.channel.send({ embed: aboutEmbed });
	}
}