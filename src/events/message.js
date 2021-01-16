module.exports = async (client, message) => {
	var prefixes = client.config.prefix;
	const mongoose = require("mongoose");
	if (message.author.bot) return;

  let messageArray = message.content.split(" ");

	var prefix = null;
	for (let thisPrefix of prefixes) {
		if (messageArray[0].startsWith(thisPrefix)) prefix = thisPrefix;
		client.prefix = prefix;
	}

	const UserSchema = require("../models/user.js");

	UserSchema.findOne({
    userID: message.author.id
  }, async (err, user) => {
    if (err) {
      console.error(err);
		}
  	if (!user) {
    	const newUserSchema = new UserSchema({
				_id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        lang: "lang_en",
      	dev: false,
				money: 0
      });
			
    	await newUserSchema.save();
			client.emit("message", (client, message));
			return;
  	}
		else {
			let giving = Math.floor(Math.random() * 3);

			user.money = user.money + giving;
			user.save();
		}

		var lang = require(`../langs/${user.lang}.json`);
		const storage = {
			lang: lang
		}

		client.storage = storage;

		if (!messageArray[0].startsWith(prefix)) return;
		
		let command = messageArray[1].toLowerCase();
		let args = messageArray.slice(2);

		let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		if (!cmd) return;

		cmd.execute(client, message, args);
		console.log(`[EXEC] "${command}" has been executed by ${message.author.tag}`);
	});
};