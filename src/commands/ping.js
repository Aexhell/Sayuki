module.exports = {
  name: "ping",
  aliases: ["pong"],
  execute: async (client, message, args) => {
		const storage = client.storage.lang.commands.ping;

		message.channel.send(storage.start).then(resultMsg => {
			const ping = resultMsg.createdTimestamp - message.createdTimestamp;

			let embed = {
				title: storage.title,
				color: "RANDOM",
				fields: [
					{
						name: storage.bot,
						value: `**${ping}** ms.`
					},
					{
						name: storage.api,
						value: `**${client.ws.ping}** ms.`
					}
				],
				footer: {
					text: storage.footer,
					icon_url: client.user.displayAvatarURL()
				}
			}

			message.channel.send({ embed: embed });
			resultMsg.delete();
		});
  }
}