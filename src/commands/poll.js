module.exports = {
	name: "poll",
	aliases: [],
	execute: async (client, message, args) => {
		const storage = client.storage.lang.commands.poll;
		let input = message.content.slice(client.prefix.length+6).split("|");

		if (!input) return message.channel.send(`:x: ${storage.args}`);

		if (!message.content.includes(" | ")) {
			if (!message.content.includes("|")) {
				return message.channel.send(`:x: ${storage.args}`);
			}
		}

		let pollEmbed = {
			title: input[0],
			description: `:one:: ${input[1]}\n:two:: ${input[2]}`,
			timestamp: new Date(),
			color: "RANDOM",
			footer: { 
				text: storage.footer.replace("{author}", message.author.tag),
				icon_url: message.author.displayAvatarURL()
			}
		}
		await message.delete().then(message.channel.send({ embed: pollEmbed }).then(async sent => {
			await sent.react("1️⃣")
			await sent.react("2️⃣");
		}));
	}
}