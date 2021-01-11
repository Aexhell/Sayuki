module.exports = {
	name: "google",
	aliases: ["googleimg", "gimg", "gi"],
	execute: async (client, message, args) => {
		const imageSearch = require('image-search-google');
		const gClient = new imageSearch(process.env.GID, process.env.GKEY);
		const storage = client.storage.lang.commands.google;

		let input = args.join(" ");
		if (!input) input = "Rick Astley";

		const options = {page:1};
		gClient.search(input, options)
 		.then(images => {
			let random = Math.floor(Math.random() * images.length);

			let result = images[random];
			
			let gEmbed = {
				title: storage.title,
				color: "#8488ff",
				image: {
					url: result.url
				}
			}
			message.channel.send({ embed: gEmbed });
  	})
  	.catch(error => console.log(error));
	}
}