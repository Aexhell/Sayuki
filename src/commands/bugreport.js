module.exports = {
	name: "bugreport",
	aliases: ["report"],
	execute: async (client, message, args) => {
		const Discord = require("discord.js");
		const storage = client.storage.lang.commands.bug;

		let input = args.join(" ");

		if (!args[0]) {
			return message.channel.send(`:x: | ${storage.err}`);
		}

		let bugEmbed = {
			title: `${storage.confirm}`,
			description: storage.desc,
			color: "RANDOM"
		}

		message.channel.send({ embed: bugEmbed }).then(msg => msg.react("👍")).then(r => {
			const filter = (reaction, user) => {
				return reaction.emoji.name === '👍' && user.id === message.author.id;
			};

			const collector = r.message.createReactionCollector(filter, { time: 5000 });

			collector.on('collect', (reaction, user) => {
				message.delete();
				r.message.delete();
				message.channel.send(`:white_check_mark: | ${storage.reported}`);

				const reportChannel = client.channels.cache.find(c => c.id === "795910434351087686");
				let reportedEmbed = {
					title: "Report.",
					description: `Anonymous reported:\n \n${input}`,
					color: "RANDOM",
					footer: {
						text: message.guild.id
					}
				}
				reportChannel.send({ embed: reportedEmbed });
			});

			collector.on('end', collected => {
				if (collected.size < 1) {
					r.message.delete();
					message.channel.send(`:x: | ${storage.timeout}`);
				}
			});
		});
	}
}