const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");


module.exports = {
    config: {
        name: "kick",
        description: "Kick the mentioned user from the server.",
        usage: "",
        category: "moderation",
        accessibleby: "Moderators",
        aliases: ["k"]
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
            return message.channel.send("You dont have permission to use this command.")

        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!kickMember)
            return message.channel.send("Please provide a user to kick.")

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason given."

        if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
            return message.channel.send("I dont have permission to do this.")

        kickMember.send(`You have been kicked from ${message.guild.name} for: ${reason}`).then(() =>
            kickMember.kick()).catch(err => console.log(err))

        message.channel.send(`**${kickMember.user.tag}** has been kicked`)
    }
}