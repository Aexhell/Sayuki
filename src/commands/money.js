module.exports = {
	name: "money",
	aliases: ["coins","wallet"],
	execute: async (client, message, args) => {
		const mongoose = require("mongoose");
		const UserSchema = require("../models/user.js");
		const storage = client.storage.lang;
		let target =
			message.mentions.members.first() ||
			message.guild.members.cache.find(u => u.id === args[0]) ||
			message.guild.members.cache.find(u => u.user.username === args[0]) || message.guild.members.cache.find(u => u.nickname === args[0]) || client.users.cache.find(u => u.id === args[0]) || message.member;

		if (!target) {
			return message.channel.send(`:x: ${storage.commands.usernotfound}`);
		}

		UserSchema.findOne({
				userID: target.user.id
			}, async (err, user) => {
				if (err) {
					message.channel.send(`**${storage.commands.money.err}**`);
					console.error(err);
					return;
				}
				if (!user.money) {
					user.money = 0;
					await user.save();
				}

				let moneyEmbed = {
					author: {
						name: storage.commands.money.title.replace("{user}", target.user.tag, "gi"),
						icon_url: target.user.displayAvatarURL()
					},
					description: storage.commands.money.desc.replace("{coins}", user.money, "gi"),
					footer: {
						text: storage.commands.money.footer
					},
					color: "RANDOM"
				}
				message.channel.send({ embed: moneyEmbed });
				return;
		});
	}
}