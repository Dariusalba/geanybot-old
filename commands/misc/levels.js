const { Attachment } = require("discord.js");

module.exports = {
    config: {
        name: "level",
        aliases: ["lv", "levels"],
        category: "info",
        description: "levels",
        usage: "[username | id, | mention]",
    },
    run: async (client, message, args) => {
        message.channel.send("https://tenor.com/view/levels-level-lvl-mee6-mee6levels-gif-19209426");
    }
}