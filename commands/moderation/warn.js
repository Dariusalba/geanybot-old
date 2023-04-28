const mongo = require("../../mongo");
const warnSchema = require("../../schemas/warnSchema");
const discord = require("discord.js");

module.exports = {
        config: {
            name: "warn",
            description: "Warns the user",
            usage: "@mention",
            category: "moderation",
            accessibleby: "Moderators",
            aliases: ["w"],
        },
        run: async (bot, message, args) => {
            const target = message.mentions.users.first();
            if (!target) {
                message.reply("Specify the user to warn")
                return;
            }

            args.shift()
            const guildID = message.guild.id;
            const userID = message.member.id;
            const reason = args.join(' ');

            const warning = {
                author: message.member.user.tag,
                timestamp: new Date().getTime(),
                reason
            }

            await mongo().then(async mongoose => {
                try {
                    await warnSchema.findOneAndUpdate({
                        guildID,
                        userID
                    }, {
                        guildID,
                        userID,
                        $push: {
                            warnings: warning
                        }
                    }, {
                        upsert: true
                    })
                } finally {
                    mongoose.connection.close()
                }
            })
            if (reason) {
                await target.send(`Youre account Its warn from ${message.guild.name} for ${reason}`);
            } else {
                await target.send(`Youre account Its warn from ${message.guild.name} for no reason given`);
            }
        }
    }