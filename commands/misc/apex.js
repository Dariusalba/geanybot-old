const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const API = require("apextab-api"), ApexTab = API.ApexTab_API;

module.exports = {
    config: {
        name:"apex",
        description: "Displays the Apex Legends stats of the mentioned user.",
        usage: "(user) (platform(pc, xbox, ps4))",
        category: "misc",
        accessibleby: "Members",
        aliases: [],
    },
    run: async(bot, message, args) => {
        if(!args[0])
            return message.channel.send("Please provide a username.");
        if(!args[1])
            return message.channel.send("Please provide a platform: pc, xbox or ps4");

        const platformCheck = { pc: API.Platform.PC, xbox: API.Platform.XBOX_ONE, ps4: API.Platform.PS4 };
        const platform = platformCheck[args[1].toLowerCase()];

        try
        {
            const results = await ApexTab.searchPlayer(args[0], platform ? platform : API.Platform.PC)

            for(let playerResult of results.results)
            {
                const player = await ApexTab.getPlayerById(playerResult.aid)
                const { name, skillratio, visits, avatar, legend, level, kills, headshots, matches, globalrank, utime } = player;

                const embed = new RichEmbed()
                    .setColor("#000001")
                    .setAuthor(`Origin (Apex Legends) | ${name}`, avatar)
                    .setThumbnail(avatar)
                    .setDescription(stripIndents`
                        **Active Legend:** ${legend || "Not found"})
                        **Global Rank:** ${globalrank || "Not ranked"}
                        **Level:** ${level || 0}
                        **Skill Ratio:** ${skillratio || "0%"}
                        **Matches:** ${matches || 0}
                        **Kills:** ${kills || 0}
                        **Headshots:** ${headshots || 0}
                        **Visits:** ${visits || 0}
                        **Playtime:** ${Math.ceil(utime / (1000 * 60 * 60 * 24)) || 0} days`)
                    .setTimestamp()

                message.channel.send(embed)
            }
        }catch(err){
            return message.channel.send("Can't find that player")
        }
    }
}