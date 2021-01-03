module.exports = {
	name: "userinfo",
	aliases: ["user", "info"],
	category: "user",
	execute: async (client,message,args) => {
		const Discord = require("discord.js");
		let target =
			message.mentions.members.first() ||
			message.guild.members.cache.find(u => u.id === args[0]) ||
			message.guild.members.cache.find(u => u.user.username === args[0]) ||message.guild.members.cache.find(u => u.nickname === args[0]) || client.users.cache.find(u => u.id === args[0]) || message.member;

		function timeConverter(UNIX_timestamp){
			var a = new Date(UNIX_timestamp);
			var day = a.getDate();
			if (day < 10) day = "0" + a.getDay();
			var month = a.getMonth();
			if (month < 10) month = `0${a.getMonth()+1}`;
			var result = `${day}/${month}/${a.getFullYear()}`
			return result;
		}
		
		let embed = new Discord.MessageEmbed()
			.setTitle(`${target.user.tag}'s Info`)
			.setThumbnail(target.user.displayAvatarURL({ format: "png", size: 1024, dynamic: true }))
			.setDescription(
				`:id:: \`${target.user.id}\`\n:page_facing_up: Nickname: **${target.nickname ? target.nickname : "None."}**\n:robot: Bot: **${target.user.bot ? "Yes." : "No."}**\n:calendar:: Join Date: **${timeConverter(target.guild.joinedTimestamp)}**\n:calendar:: Discord Date: **${timeConverter(target.user.createdTimestamp)}**`
				)
			.setColor("RANDOM")
			.setFooter(`If this wasn't the user you wanted, it means that the requested user wasn't found.`);
		message.channel.send(embed);
	}
}