const { ErelaClient, Utils } = require("erela.js");
const { stat } = require("fs");
const { nodes } = require("../../botconfig.json");

module.exports = async bot => {
    console.log(`${bot.user.username} is online`)
    console.log(`Bot: Hosting ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`)

    bot.music = new ErelaClient(bot, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Successfully created a new node."))
        .on("queueEnd", player => {
            player.textChannel.send("Queue ended.")
            return bot.music.players.destroy(player.guild.id)
        })
        .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``))

    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

    bot.user.setActivity("maical jecsan", {type: "LISTENING",});
};