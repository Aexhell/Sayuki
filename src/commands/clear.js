module.exports = {
	name: "clear",
	aliases: ["purge"],
	execute: async (client, message, args) => {
		const storage = client.storage.lang.commands.clear;

		let amount = Number(args[0]);
		let channel = args[1];

		if (!args[1]) channel = message.channel;
		if (!args[0]) {
			return message.channel.send(":x: Usage: `.s clear 10`");
		}

		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: ${storage.perms}`);

		if (amount > 99) return message.channel.send(storage.err);

		await channel.bulkDelete(amount+1);

		message.channel.send(`${storage.cleared.replace("{amount}",`\`${amount}\``)}`).then(msg => msg.delete({ timeout: 3000 }));
	}
}