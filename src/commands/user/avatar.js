const ping = require("../general/ping")

module.exports = {
    name: "avatar",
    aliases: ["pfp", "icon","usericon","useravatar","userpfp"],
    category: "user",
    execute: async (client, message, args) => {
        message.channel.send(`Your pfp: ${message.author.displayAvatarURL({ format: "png", size: 1024, dynamic: true})}`)
    }
}