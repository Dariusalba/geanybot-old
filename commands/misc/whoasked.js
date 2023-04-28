const { Attachment } = require("discord.js");

module.exports = {
    config: {
        name: "whoasked",
        aliases: ["dontrememberasking"],
        category: "misc",
        accessibleby: "Members",
    },
    run: async (bot, message, args) => {
        const attachment = new Attachment('./whoasked.mp4');
        message.channel.send(attachment);
    }
}