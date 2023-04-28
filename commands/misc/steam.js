const {
    RichEmbed
} = require("discord.js");
const fetch = require("node-fetch");
const dateFormat = require("dateformat");
const {
    stripIndents
} = require("common-tags");

module.exports = {
    config: {
        name: "steam",
        description: "Shows the steam profile of the provided user",
        usage: "(user)",
        category: "misc",
        accessibleby: "members"
    },
    run: async (bot, message, args) => {
        const token = 'B935FE0B3149037DE5A8B8F1B8047CFA'

        if (!args[0])
            return message.channel.send("No steam profile provided.");

        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;
        fetch(url).then(res => res.json()).then(body => {
            if (body.response.success === 42)
                return message.channel.send("Profile not found");

            const id = body.response.steamid;
            const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
            const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
            const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to Play", "Looking to Trade"]

            fetch(summaries).then(res => res.json()).then(body => {
                if (!body.response)
                    return message.channel.send("Profile not found");
                const {
                    personaname,
                    avatarfull,
                    realname,
                    personastate,
                    loccountrycode,
                    profileurl,
                    timecreated
                } = body.response.players[0];

                fetch(bans).then(res => res.json()).then(body => {
                    if (!body.players)
                        return message.channel.send("Profile not found")
                    const {
                        NumberOfVACBans,
                        NumberOfGameBans
                    } = body.players[0];

                    const embed = new RichEmbed()
                        .setColor("#ffffff")
                        .setAuthor(`${personaname}'s steam profile`, avatarfull)
                        .setThumbnail(avatarfull)
                        .setDescription(stripIndents `**>Real Name:** ${realname || "Unknown"}
                        **>Status:** ${state[personastate]}
                        **>Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                        **>Account created at:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                        **>Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                        **>Link:** [profile link](${profileurl})`)
                        .setTimestamp();

                    message.channel.send(embed)
                })
            })
        })
    }
}