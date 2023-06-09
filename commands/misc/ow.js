const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const overwatch = require("overwatch-api");

module.exports = {
    config: {
        name: "overwatch",
        description: "Displays a user's overwatch stats!",
        usage: "<user> <platform>",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["ow"] 
    }, 
    run: async (bot, message, args) => {
        if(!args[0]) 
            return message.channel.send("Please provide a username.");

        if(!args[1] || (args[1] && !["pc", "xbl", "psn"].includes(args[1]))) 
            return message.channel.send("Please provide a platform (pc, xbox or psn)");

        if(args[0].includes("#")) 
            args[0] = args[0].replace(/#/g, "-");

            overwatch.getProfile(args[1], "global", args[0], (err, json) => {
                if (err) 
                    return message.channel.send("Unable to find a user with that username.");

                const { games, level, portrait, username, playtime: { competitive, quickplay }, private } = json;
                const { sportsmanship, shotcaller, teammate } = json.endorsement;
                const { won, draw, played, lost, win_rate } = json.games.competitive;

                if(private) return message.channel.send("The specified user's profile is private.");
                        
                    const embed = new RichEmbed()
                        .setColor("#00001")
                        .setAuthor(`Overwatch Stats | ${username}`, portrait)
                        .setThumbnail(portrait)
                        .addField("General:", stripIndents`
                        **Level:** ${profile.level || 0}
                        **Sportsmanship:** ${sportsmanship.rate || 0}
                        **Shotcaller:** ${shotcaller.rate || 0}
                        **Teammate:** ${teammate.rate || 0}
                        `)
                        .addField("Competitive:", stripIndents`
                        **Played:** ${games.competitive.played || 0}
                        **Won:** ${games.competitive.won || 0}
                        **Draw:** ${games.competitive.draw || 0}
                        **Lost:** ${games.competitive.lost || 0}
                        **Win Rate:** ${games.competitive.win_rate || 0}
                        **Playtime:** ${competitive || 0}
                        `, true)
                        .addField("QuickPlay:", stripIndents`
                        **Played:** ${games.quickplay.played || "N/A"}
                        **Won:** ${games.quickplay.won || 0}
                        **Playtime:** ${quickplay || 0}
                        `, true)
                        .setTimestamp();

                    message.channel.send(embed);                      
                })
    }
}