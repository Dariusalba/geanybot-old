const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports = {
    config: {
        name: "purge",
        description: "Prunes x messages from chat",
        usage: "<number of messages>",
        category: "moderation",
        accessibleby: "Moderators",
        aliases: []
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        // Member perms?
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You do not have permission to delete messages.")
                .then(m => m.delete(15000));
        }

        //Args?
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("How many messages should I delete? (number of messages + 1)")
                .then(m => m.delete(15000));
        }

        //Bot perms?
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("I do not have permission to delete messages.")
                .then(m => m.delete(15000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        }
        else {
            deleteAmount = parseInt(args[0]);
            message.channel.send("I successfully deleted " + deleteAmount + " messages")
                .then(m => m.delete(15000));
        }

        message.channel.bulkDelete(deleteAmount, true)
            .catch(err => message.reply(`${err}`));
    }
}