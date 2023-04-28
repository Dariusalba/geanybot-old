const { Attachment, RichEmbed, DiscordAPIError } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    config: {
        name: "beat",
        aliases: ["punch"],
        category: "misc",
        description: "Fuck somebody up",
        accessibleby: "Members",
        usage: "",
    },
    run: async(bot, message, args) => {
        let mentionedUser = getMember(message, args.join(" "));

        if(mentionedUser.displayName == message.author.username)
            return message.channel.send("You can't fuck yourself up");

        const embed = new RichEmbed()
            .setTitle(message.author.username + ' beats the shit out of ' + mentionedUser.displayName)
            .setColor("RANDOM")
            .setImage("https://cdn.discordapp.com/attachments/358249931947114496/785993818469957652/br.gif")
            .setTimestamp()
            .setFooter(message.author.username)
        message.channel.send(embed)
    }
}