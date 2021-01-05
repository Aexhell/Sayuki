module.exports = {
	name: "hug",
	aliases: [],
	execute: async (client, message, args) => {
		const superagent = require("superagent");
		const storage = client.storage.lang.commands.hug;
		let target =
			message.mentions.members.first() ||
			message.guild.members.cache.find(u => u.id === args[0]) ||
			message.guild.members.cache.find(u => u.user.username === args[0]) ||message.guild.members.cache.find(u => u.nickname === args[0]) || client.users.cache.find(u => u.id === args[0]);

		if (!target) target = client;

		if (target.user.id === message.author.id) return message.channel.send(storage.yourself);

		superagent.get("https://api.aexhell.ml/v2/get/hug/").end((request,response) => {
			let hugEmbed = {
				description: `**${message.author.username}**${storage.desc.replace("{user2}", `**${target.user.username}**`)}`,
				color: "RANDOM",
				image: {
					url: response.body.image
				},
				footer: {
					text: storage.powered,
					icon_url: client.user.displayAvatarURL()
				}
			}

			if (client.storage.lang.lang === "es") hugEmbed.description = `¡**${message.author.username}** ${storage.desc.replace("{user2}", `**${target.user.username}**`)}`;
			message.channel.send({ embed: hugEmbed });
		});
	}
}