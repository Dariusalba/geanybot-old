const Discord = require("discord.js");

module.exports = {
    config: {
        name: "ping",
        description: "Displays latency and API latency",
        usage: "",
        category: "misc",
        accessibleby: "Members",
        aliases: []
    },
    run: async (bot, message, args) => {

        const msg = await message.channel.send(`:ping_pong: Pinging...`);

        msg.edit(`:ping_pong: Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(bot.ping)}ms`);
    }
}