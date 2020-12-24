module.exports = async (client, message) => {
	var prefixes = client.config.prefix;
	if (message.author.bot) return;

  let messageArray = message.content.split(" ");

	var prefix = null;
	for (let thisPrefix of prefixes) {
		if (messageArray[0].startsWith(thisPrefix)) prefix = thisPrefix;
	}

	if (!messageArray[0].startsWith(prefix)) return;
	
	let command = messageArray[1].toLowerCase();
	let args = messageArray.slice(2);

	let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	if (!cmd) return;

	cmd.execute(client, message, args);
	console.log(`[EXEC] "${command}" has been executed by ${message.author.tag}`);
};