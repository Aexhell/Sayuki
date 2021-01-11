module.exports = {
	name: "image",
	aliases: ["search","imgur","img","im"],
	execute: async (client, message, args) => {
		const superagent = require("superagent");
		const storage = client.storage.lang.commands.image;

		let input = args.join(" ");
		
		if (!input) return message.channel.send(`:x: ${storage.args}\n\`.s imgur touhou\``);

		message.channel.send(storage.search).then(async msg => {
			await superagent.get(`https://api.imgur.com/3/gallery/search/?q_all=${input}&q_type=png&q_not=nsfw`).set("Authorization",`Client-ID ${process.env.IMGUR}`).end((request,response) => {
				let random = Math.floor(Math.random() * response.body.data.length);
				let body = response.body.data[random];

				if (!body) {
					msg.delete().then(message.channel.send(storage.nothing));
					return;
				}

				let imgEmbed = {
					title: body.title,
					color: "#1bb76e",
					url: body.link,
					footer: {
						text: "Powered by Imgur",
						icon_url: "https://s.imgur.com/images/favicon-152.png"
					},
					author: {
						name: storage.uploaded.replace("{user}",body.account_url),
						url: `https://imgur.com/user/${body.account_url}`,
						icon_url: `https://imgur.com/user/${body.account_url}/avatar`
					},
					image: {
						url: body.images[0].link
					}
				}

				msg.delete().then(message.channel.send({ embed: imgEmbed }));
			});
		})
	}
}