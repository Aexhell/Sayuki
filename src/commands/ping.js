module.exports = {
  name: "ping",
  aliases: ["pong"],
  category: "general",
  execute: async (client, message, args) => {
		const UserSchema = require("../models/user.js");

		let str = client.storage.lang.commands.ping;
		let newStr = str.replace("{user}", message.author.tag, "gi");

    message.channel.send(newStr);
  }
}