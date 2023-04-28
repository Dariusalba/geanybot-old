const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const superagent = require("superagent");

module.exports = {
    config: {
        name: "unmute",
        description: "Unmutes the user",
        usage: "(@mention) / .um (@mention)",
        category: "moderation",
        accessibleby: "Staff",
        aliases: ["um"]
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
            return message.channel.send("You don't have permissions to use this command.");
        if (!message.guild.me.hasPermission(["MANAGE_ROLES"]))
            return message.channel.send("I don't have permissions to change roles.");

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee)
            return message.channel.send("Provide a user to be unmuted");

        let reason = args.slice(1).join(" ");
        if (!reason)
            reason = "No reason given"

        let muterole = message.guild.roles.find(r => r.name === "Muted")
        if (!muterole)
            return message.channel.send("That person is not Muted.");

        mutee.removeRole(muterole.id).then(() => {
            message.delete()
            mutee.send(`Unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
            message.channel.send(`${mutee.user.username} was unmuted.`)
        })

        let embed = new Discord.RichEmbed()
            .setColor("BLACK")
            .setAuthor(`${message.guild.name} mutelogs`, message.guild.iconURL)
            .addField("Moderation:", "unmute")
            .addField("Mutee:", mutee.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
        let sChannel = message.guild.channels.find(c => c.name === "mutelogs");
        sChannel.send(embed);
    }
}