module.exports = {
	name: "avatar",
	aliases: ["pfp", "icon"],
	category: "user",
	execute: async (client,message,args) => {
		let target =
			message.mentions.members.first() ||
			message.guild.members.cache.find(u => u.id === args[0]) ||
			message.guild.members.cache.find(u => u.user.username === args[0]) ||message.guild.members.cache.find(u => u.nickname === args[0]) || client.users.cache.find(u => u.id === args[0]) || message.member;

		message.channel.send(`**${target.user.tag}**'s avatar: ${target.user.displayAvatarURL({ size: 1024, dynamic: true, format: "png" })}`);
	}
}