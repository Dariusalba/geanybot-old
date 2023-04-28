module.exports = {
    config: {
        name: "leave",
        aliases: [""],
        description: "The bot will leave the voice channel",
        accessibleby: "Members",
        category: "music",
    },
    run: async (bot, message, args) => {
        const {
            voiceChannel
        } = message.member;
        const player = bot.music.players.get(message.guild.id);

        if (!player)
            return message.channel.send("No song is currently playing");
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id)
            return message.channel.send("You need to be in a voice channel");

        bot.music.players.destroy(message.guild.id);
        return message.channel.send("Bye");

    }
}