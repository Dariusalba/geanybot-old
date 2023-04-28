const { Attachment } = require("discord.js");

module.exports = {
    config: {
        name: "negro",
        aliases: ["geani"],
        category: "misc",
        description: "",
        accessibleby: "Members",
        usage: "",
    },
    run: async(bot, message, args) => {
        const attachment = new Attachment('./negro.mp4');
        message.channel.send(attachment);
    }
}