module.exports = {
	name: "github",
	aliases: ["git"],
	execute: async (client, message, args) => {
		const { Octokit } = require("@octokit/rest");
		const okit = new Octokit();
		const storage = client.storage.lang.commands.github;
		
		if (!args[0]) return message.channel.send(`:x: ${storage.err}`);
		
		okit.users.getByUsername({
  		username: args[0],
		}).then(data => {
			const result = data.data;

			let gitEmbed = {
				title: storage.title.replace("{user}",result.login),
				color: "#05264c",
				url: result.html_url,
				fields: [
					{
						name: ":id::",
						value: `\`${result.id}\`.`,
						inline: true
					},
					{
						name: storage.followers.title,
						value: result.followers ? storage.followers.value.replace("{value}",result.followers) : client.storage.lang.none + ".",
						inline: true
					},
					{
						name: storage.bio,
						value: result.bio ? result.bio : client.storage.lang.none + ".",
						inline: true
					},
					{
						name: storage.location,
						value: result.location ? result.location : client.storage.lang.none + ".",
						inline: true
					},
					{
						name: storage.register,
						value: `${result.created_at.substring(8,10)}/${result.created_at.substring(5,7)}/${result.created_at.substring(0,4)}`,
						inline: true
					},
					{
						name: storage.repos.title,
						value: result.public_repos ? storage.repos.value.replace("{value}",result.public_repos) : client.storage.lang.none + ".",
						inline: true
					}
				],
				thumbnail: {
					url: result.avatar_url
				},
				footer: {
					text: "Powered by GitHub",
					icon_url: "https://github.com/fluidicon.png"
				}
			}
			
			message.channel.send({ embed: gitEmbed });
		}).catch(err => message.channel.send(`:x: | ${storage.notfound}`));
	}
}