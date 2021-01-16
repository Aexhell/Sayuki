module.exports = {
	name: "support",
	aliases: ["invite"],
	execute: async (client, message, args) => {
		const storage = client.storage.lang.commands.support;

		message.channel.send({ embed: {
			title: storage.title,
			description: storage.desc,
			author: {
				name: message.author.tag,
				icon_url: message.author.displayAvatarURL()
			},
			color: "RANDOM"
		}});
	}
}