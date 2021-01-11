module.exports = { 
	name: "hastebin",
	aliases: ["haste","hbin"],
	execute: async (client, message, args) => {
		const hastebin = require("hastebin-gen");
		const storage = client.storage.lang.commands.hastebin;
		let haste = args.slice(0).join(" ");

		if (!args[0]) return message.channel.send(`:x: | ${storage.args}`);

		message.channel.send(`:information_source: | ${storage.uploading}...`).then(sent => {
			sent.delete();
		});

		try {
			hastebin(haste).then(r => {
				let hasteEmbed = {
					author: {
						name: message.author.tag,
						icon_url: message.author.displayAvatarURL()
					},
					title: "Hastebin",
					color: "RANDOM",
					description: storage.result.replace("{r}",r),
					footer: {
						text: `rel. ver. ${client.config.version}`,
						icon_url: client.user.displayAvatarURL()
					}
				}
				message.channel.send({ embed: hasteEmbed });
			});
		}
		catch(err) {
			message.channel.send(`:x: | ${storage.err}`);
		}
	}
}