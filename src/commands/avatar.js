module.exports = {
	name: "avatar",
	aliases: ["pfp", "icon"],
	execute: async (client,message,args) => {
		const storage = client.storage.lang;
		let target =
			message.mentions.members.first() ||
			message.guild.members.cache.find(u => u.id === args[0]) ||
			message.guild.members.cache.find(u => u.user.username === args[0]) ||message.guild.members.cache.find(u => u.nickname === args[0]) || client.users.cache.find(u => u.id === args[0]);

		if (!target && args[0]) return message.channel.send(`:x: | ${storage.commands.avatar.err}`);
		else if (!target && !args[0]) target = message.member;

		let str = storage.commands.avatar.title.replace("{user}", `**${target.user.tag}**`);
		
		message.channel.send(`${str}: ${target.user.displayAvatarURL({ size: 1024, dynamic: true, format: "png" })}`);
	}
}