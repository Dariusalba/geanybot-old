const { RichEmbed } = require ("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags"); 

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "commands"],
        usage: "",
        category: "misc",
        description: "Displays all the commands.",
        accesibleby: "Members",
    },
    run: async (bot, message, args) => {
        const embed = new RichEmbed()
            .setColor("#000000")
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)

        if(!args[0])
        {
            const categories = readdirSync("./commands/")

            embed.setDescription(`comenzi geani\nPrefix is: **${prefix}**`)
            embed.setFooter(`geani pula negro | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try
                {
                    embed.addField(`> ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e){
                    console.log(e)
                }
            })
            
            return message.channel.send(embed)
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command)
                return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for geani commands`))
            command = command.config

            embed.setDescription(stripIndents`Prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accesibleby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(" ") : "None"}`)

            return message.channel.send(embed);
        }
    }
}