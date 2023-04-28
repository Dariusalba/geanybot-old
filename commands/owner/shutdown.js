const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports = {
    config: {
        name: "shutdown",
        description: "Shuts the bot down",
        usage: "",
        category: "owner",
        accessibleby: "Bot owner",
        aliases: ["stop"]
    },
    run: async (bot, message, args) => {

        if (message.author.id != "225548050196725760")
            return message.channel.send("Only the bot owner can use this command.");

        try {
            await message.channel.send("Shutting down...")
            process.exit()
        } catch (e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
    }
}