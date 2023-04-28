const {
    Attachment
} = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
    config: {
        name: "leaderboard",
        aliases: ["lb"],
        category: "misc",
        description: "Shows the XP leaderboard.",
        usage: "[]",
    },
    run: async (client, message, args) => {
        /*const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if(rawLeaderboard.length < 1)
            return message.reply("No users in the leaderboard!");
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        const lb = leaderboard.map(e => {
            `${e.position}. ${e.username}#${e.discriminator}\nXP: ${e.xp.toLocaleString()}`;
        });
        message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);*/
        message.channel.send("To unlock the leaderboards please send me $10 on PayPal.com");
    }
}