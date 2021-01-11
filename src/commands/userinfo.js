module.exports = {
	name: "userinfo",
	aliases: ["user", "info"],
	execute: async (client,message,args) => {
		const Discord = require("discord.js");
		const storage = client.storage.lang;
		let target =
			message.mentions.members.first() ||
			message.guild.members.cache.find(u => u.id === args[0]) ||
			message.guild.members.cache.find(u => u.user.username === args[0]) || message.guild.members.cache.find(u => u.nickname === args[0]) || client.users.cache.find(u => u.id === args[0]) || message.member;

		function timeConverter(UNIX_timestamp){
			var a = new Date(UNIX_timestamp);
			var day = a.getDate();
			if (day < 10) day = "0" + a.getDay();
			var month = a.getMonth();
			if (month < 10) month = `0${a.getMonth()+1}`;
			var result = `${day}/${month}/${a.getFullYear()}`
			return result;
		}
		
		let userEmbed = {
			thumbnail: { 
				url: target.user.displayAvatarURL(),
				width: 512,
				height: 512
			},
			title: storage.commands.user.title.replace("{user}", target.user.tag, "gi"),
			description: 
				`:id:: \`${target.user.id}\`.\n` + `:page_facing_up: ${storage.commands.user.nickname}: **${target.nickname ? target.nickname : storage.none}.**\n` + 
				`:robot: Bot: **${target.user.bot ? storage.yes : "No."}**\n` + 
				`:calendar: ${storage.commands.user.joindate}: **${timeConverter(target.guild.joinedTimestamp)}**\n` + `:calendar: ${storage.commands.user.discorddate}: **${timeConverter(target.user.createdTimestamp)}**`,
			color: "RANDOM",
			footer: { text: storage.commands.user.footer }
		}
		message.channel.send({ embed: userEmbed });
	}
}