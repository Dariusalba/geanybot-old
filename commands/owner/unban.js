const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");


module.exports = {
    config: {
        name: "unban",
        description: "Unbans the mentioned user.",
        usage: "<user>",
        category: "owner",
        accessibleby: "Administrators",
        aliases: ["ub"]
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
            return message.channel.send("You don't have permission to use this command.");

        let bannedMember = await bot.fetchUser(args[0])
        if (!bannedMember)
            return message.channel.send("Provide a user to unban.");

        let reason = args.slice(1).join(" ")
        if (!reason)
            reason = "No reason given."

        if (!message.guild.me.hasPermission("BAN_MEMBERS", "ADMINISTRATOR"))
            return message.channel.send("I don't have permission to use this command.");
        message.delete();
        try {
            message.guild.unban(bannedMember, { reason: reason })
            message.channel.send(`${bannedMember.tag} has been unbanned.`)
        } catch (e) {
            console.log(e.message);
        }
    }
}