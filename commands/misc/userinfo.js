const botconfig = require("../../botconfig.json");
const {
    getMember,
    formatDate
} = require("../../functions.js");
const {
    RichEmbed
} = require("discord.js");
const {
    stripIndents
} = require("common-tags");

module.exports = {
    config: {
        name: "userinfo",
        description: "Shows the userinfo of the mentioned user",
        usage: "(@mention)",
        category: "misc",
        accessibleby: "Members",
        aliases: ["uinfo"]
    },
    run: async (bot, message, args) => {

        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || NamedNodeMap;

        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField('Member information', stripIndents `**> Display name:** ${member.displayName}
            **> Joined At:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField('User Information', stripIndents `**> ID:** ${member.user.id}
            **> Username:** ${member.user.tag}
            **> Discord Tag:** ${member.user.tag}
            **> Created At:** ${created}`, true)

            .setTimestamp()

        if (member.user.presence.game)
            embed.addField('Currently Playing', `**> Game:** ${member.user.presence.game.name}`)

        message.channel.send(embed);
    }
}