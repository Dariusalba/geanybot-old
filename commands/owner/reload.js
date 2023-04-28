const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports = {
    config: {
        name: "reload",
        description: "Reloads the specified command",
        usage: "<cmd>",
        category: "owner",
        accessibleby: "Bot Owner",
        aliases: ["rld"]
    },
    run: async (bot, message, args) => {

        if (message.author.id != "225548050196725760")
            return message.channel.send("Only the bot owner can use this command.");

        if (!args[0])
            return message.channel.send("Provide a command to reload.");

        let commandName = args[0].toLowerCase();

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)]
            bot.commands.delete(commandName)
            const pull = require(`./${commandName}.js`)
            bot.commands.set(commandName, pull)
        } catch (e) {
            return message.channel.send(`Could not reload: \`${args[0].toLowerCase()}\``);
            return message.channel.send(e)
        }

        message.channel.send("Command successfully reloaded.");
    }
}