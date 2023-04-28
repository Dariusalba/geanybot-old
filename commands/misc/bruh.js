const { Attachment, RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "bruh",
        aliases: ["bruhmoment", "bromomento", "bro"],
        category: "info",
        description: "Bruh moment",
        usage: "[username | id, | mention]",
    },
    run: async (client, message, args) => {
        const attachment = new Attachment('./bruh.mp3')
        const attachment2 = new Attachment("https://i.ytimg.com/vi/ZF57zsOWdB0/maxresdefault.jpg")
        message.channel.send(attachment);
        message.channel.send(attachment2);
    }
}
