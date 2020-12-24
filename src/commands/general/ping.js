module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "general",
    execute: async (client, message, args) => {
        message.channel.send("Pong!");
    }
}