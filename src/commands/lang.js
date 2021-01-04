module.exports = {
	name: "lang",
	aliases: ["language"],
	execute: async (client, message, args) => {
		const UserSchema = require("../models/user.js");
		const mongoose = require("mongoose");
		const storage = client.storage.lang;

		if (!args[0]) {
			let initEmbed = {
				title: storage.commands.lang.embedtitle.replace("{user}", message.author.username, "gi"),
				description: storage.commands.lang.embeddesc,
				color: "RANDOM"
			}
			return message.channel.send({ embed: initEmbed });
		}

		let langArg = args[0].toLowerCase();
		if (storage.langs.includes(langArg)) {
      UserSchema.findOneAndUpdate({
        userID: message.author.id
      }, {
        $set: {
          lang: `lang_${langArg}`
        }
      }, {
        new: true
      }).then(() => {
      	let newLang = require(`../langs/lang_${langArg}.json`);
        message.channel.send(newLang.commands.lang.changedsucess);
      }).catch((err) => {
        message.channel.send("Didn't work. :(");
      });
		}
		else {
			return message.channel.send(`:x: | ${storage.commands.lang.notalang}`)
		}
	}
}