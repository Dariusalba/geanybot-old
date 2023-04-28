const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const superagent = require("superagent");

module.exports = {
    config: {
        name: "mute",
        description: "Mutes the user",
        usage: "(@mention) / .m (@mention)",
        category: "moderation",
        accessibleby: "Staff",
        aliases: ["m"]
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
            return message.channel.send("You don't have permission to use this command.");

        if (!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATOR"))
            return message.channel.send("I don't have any permissions");

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee)
            return message.channel.send("Provide a user to mute.");

        let reason = args.slice(1).join(" ");
        if (!reason)
            reson = "No reason given."

        let muterole = message.guild.roles.find(r => r.name === "Muted");
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#514f48",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }

        mutee.addRole(muterole.id).then(() => {
            message.delete()
            mutee.send(`Muted in ${message.guild.name} for: ${reason}`)
            message.channel.send(`${mutee.user.username} was successfully muted.`)
        })

        let embed = new Discord.RichEmbed()
            .setColor("#514f48")
            .setAuthor(`${message.guild.name} mutelogs`, message.guild.iconURL)
            .addField("Moderation:", "mute")
            .addField("Mutee:", mutee.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt)
        let sChannel = message.guild.channels.find(c => c.name === "general-bruh-moments")
        sChannel.send(embed);
    }
}