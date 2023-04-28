const discord = require("discord.js");

module.exports = {
    config: {
        name: "avatar",
        description: "Shows your avatar",
        usage: "@mention",
        category: "misc",
        accessibleby: "Members",
        aliases: ["a"],
    },
    run: async(bot, message, args) => {
        let mentionedUser = message.mentions.users.first() || message.author;

        let embed = new discord.RichEmbed()
            .setImage(mentionedUser.displayAvatarURL)
            .setColor("RANDOM")
            .setTitle(mentionedUser.username + "'s avatar")
            .setFooter("Requested by: " + message.author.tag)
            .setTimestamp()
        message.channel.send(embed);
    }
}