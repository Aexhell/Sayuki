module.exports = {
	name: "eval",
	aliases: ["evaluate","execute","exec"],
	execute: async (client, message, args) => {
		const storage = client.storage.lang.commands.eval;
		let code = args.join(" ");
		const UserSchema = require("../models/user.js");
		const mongoose = require("mongoose");

		function jsUcfirst(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}		

		UserSchema.findOne({
				userID: message.author.id
			}, async (err, user) => {
				if (err) {
					console.error(err);
					return;
				}

				if (user.dev === false) return message.channel.send(":x: | `You don't have permissions.`");

				let evalEmbed = {
					title: "Evaluate",
					color: "RANDOM",
					fields: [
						{
							name: "Type",
							value: `\`\`\`prolog\n${jsUcfirst(typeof(code))}\`\`\``,
							inline: true
						},
						{
							name: "Evaluated in:",
							value: `\`\`\`yaml\n${new Date()-message.createdTimestamp} ms.\`\`\``,
							inline: true
						},
						{
							name: "Input:",
							value: `\`\`\`js\n${code}\`\`\``,
							inline: false
						},
						{
							name: "Output:",
							value: `\`\`\`js\n${eval(code)}\`\`\``,
							inline: false
						}
					]
				}
				message.channel.send({ embed: evalEmbed });
		});
	}
}