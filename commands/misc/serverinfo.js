const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports = {
    config: {
        name: "serverinfo",
        description: "Shows server information",
        usage: "",
        category: "misc",
        accessibleby: "Members",
        aliases: ["svinfo"]
    },
    run: async (bot, message, args) => {
        let sEmbed = new Discord.RichEmbed()
            .setColor("#ffffff")
            .setTitle("Server Information")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .addField("**Server Name:**", `${message.guild.name}`, true)
            .addField("**Server Owner:**", `${message.guild.owner}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Role Count:**", `${message.guild.roles.size}`, true)
            .setFooter(`geani | pula negro`, bot.user.displayAvatarURL);
        message.channel.send({
            embed: sEmbed
        });
    }
}