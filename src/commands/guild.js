module.exports = {
	name: "guild",
	aliases: ["server","serverinfo","guildinfo","ginfo","sinfo"],
	execute: async (client, message, args) => {
		const storage = client.storage.lang.commands.guild;

		let guildEmbed = {
			title: message.guild.name,
			thumbnail: {
				url: message.guild.iconURL({ dynamic: true })
			},
			color: "RANDOM",
			description: `:raccoon: ${storage.members.title}: ${storage.members.value.replace("{m}", `**${message.guild.members.cache.size}**`)}\n` + 
			`:european_post_office: Server Region: ${storage.region[message.guild.region]}\n` +
			`:id:: \`${message.guild.id}\`.`
		}

		message.channel.send({ embed: guildEmbed });
	}
}