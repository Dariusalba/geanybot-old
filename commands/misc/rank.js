const discord = require("discord.js");
const Levels = require("discord-xp");
const mongo = require("../../mongo")
const LevelSchema = require('../../schemas/levelSchema')
const canvacord = require("canvacord");
const async = require('async')

module.exports = {
    config: {
        name: "rank",
        aliases: [],
        category: "misc",
        description: "Shows the rank of the mentioned person or the author of the message.",
        usage: "[username | id, | mention]",
    },
    run: async (client, message, args) => {
        //message.channel.send("https://media.discordapp.net/attachments/659630509894271001/747444834352103454/image0-24.gif");
        const target = message.mentions.users.first() || message.author;

        const user = await Levels.fetch(target.id, message.guild.id);

        const neededXP = Levels.xpFor(parseInt(user.level) + 1);

        /*const addEXP = async(guildID, userID, randomXpAmount) => {
            await mongo().then(async mongoose => {
                try {
                    const result = await LevelSchema.findOneAndUpdate({
                        guildID,
                        userID
                    }, {
                        guildID,
                        userID,
                        $inc: {
                            xp: randomXpAmount
                        }
                    }, {
                        upsert: true,
                        new: true
                    })
                } finally {
                    mongoose.connection.close()
                }
            })
        }*/

        if (!user)
            return message.reply("You don't have XP, start chatting to earn some!");

        //const addXP = async(guildID)

        const img = target.displayAvatarURL;
        const userLevel = parseInt(user.level);
        const userRank = parseInt(user.rank);

        const rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL)
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXP)
            .setStatus(target.presence.status)
            .setProgressBar('#FFA500', "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator)
            .setLevel(userLevel)
            .setRank(userRank)

        rank.build()
            .then(buffer => {
                canvacord.write(buffer, "rank.png");
                const attachment = new discord.Attachment('./rank.png');
                message.channel.send(attachment);
            });

        //message.channel.send(`> **${target.tag}** is currently level ${user.level} with ${user.xp}XP.`);
    }
}